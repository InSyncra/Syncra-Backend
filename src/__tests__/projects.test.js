import "dotenv/config";
import supertest from "supertest";
import { prisma } from "../utils/prisma.js";
import createServer from "../utils/server.js";

const successfulResponse = {
	data: expect.anything(),
	error: null,
	success: true
}

const failedResponse = {
	data: null,
	error: expect.any(String),
	success: false
}

const app = createServer();

describe("projects", () => {
	describe("Return projects", () => {
		describe("return all projects", () => {
			it("should exist as GET /api/v1/projects", async () => {
				const res = await supertest(app).get("/api/v1/projects")
				expect(res.status).not.toBe(404)
			})
		})
	})
	describe("Return a single project", () => {
		let user;
		let project;
		beforeEach(async () => {
			user = await prisma.user.create({
				data: {
					firstName: "Testing",
					lastName: "User",
					username: "iamatestuser",
					email: "iamatestuser@demo.com",
					hashedPassword: "testing1234",
					birthdate: "12-24-1995",
				},
			});

			project = await prisma.project.create({
				data: {
					ownerId: user?.id,
					title: "Test Project",
					description: "I am a project",
				},
			});
		});

		afterEach(async () => {
			await prisma.project.deleteMany({
				where: {
					id: project?.id,
				},
			});
			await prisma.user.deleteMany({
				where: {
					email: "iamatestuser@demo.com",
				},
			});
		});
		it("should exist as GET /api/v1/projects/:projectId", async () => {
			const id  = project?.id || "project-123456" // doesn't matter the route
			const res = await supertest(app).get(`/api/v1/projects/${id}`)
			expect(res.status).not.toBe(404)
		})
		it("should return 404, and error response if project doesn't exist", async () => {
			const projectId = "453804-cdsjisodjc-acdhaiuhi";
			const res = await supertest(app).get(`/api/v1/projects/${projectId}`)
			
			expect(res.status).toBe(404)
			expect(res.body).toEqual(failedResponse)
		});

		it("should return 200, project data, and appropriate response", async () => {
			const projectId = project?.id;
			const res = await supertest(app).get(`/api/v1/projects/${projectId}`);

			expect(res.status).toBe(200);
			expect(res.body).toEqual(successfulResponse)
		});
	});
});
