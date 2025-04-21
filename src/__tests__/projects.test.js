import supertest from "supertest";
import { prisma } from "../utils/prisma.js";
import createServer from "../utils/server.js";

const app = createServer();

describe("projects", () => {
	describe("GET /api/v1/projects/:id", () => {
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

			console.log("USER CREATED", user, "PROJECT CREATED", project);
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
			console.log("DELETED TEST USER AND PROJECT");
		});
		it("should return a 404 error if project doesn't exist", async () => {
			const projectId = "453804-cdsjisodjc-acdhaiuhi";
			await supertest(app).get(`/api/v1/projects/${projectId}`).expect(404);
		});

		it("should return 200 status and project data", async () => {
			const projectId = project?.id;
			console.log("PROJECT ID", projectId);
			const res = await supertest(app).get(`/api/v1/projects/${projectId}`);

			expect(res.status).toBe(200);
			expect(res.body.id).toBe(project?.id);
		});
	});
});
