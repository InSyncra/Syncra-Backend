import "dotenv/config";
import supertest from "supertest";
import { prisma } from "../utils/prisma.js";
import createServer from "../utils/server.js";

const baseUrl = "/api/v1";

const successfulResponse = {
	data: expect.anything(),
	error: null,
	success: true,
};

const failedResponse = {
	data: null,
	error: expect.any(String),
	success: false,
};

const app = createServer();

describe("projects", () => {
	describe("getting projects", () => {
		let user1;
		let user2;
		let user3;

		beforeEach(async () => {
			// Create users
			user1 = await prisma.user.create({
				data: {
					firstName: "Alice",
					lastName: "Wonder",
					username: "alicew",
					email: "alice@example.com",
					hashedPassword: "hashedpass1",
					birthdate: "1990-01-01",
					pastProjectLinks: [],
				},
			});

			user2 = await prisma.user.create({
				data: {
					firstName: "Bob",
					lastName: "Builder",
					username: "bobb",
					email: "bob@example.com",
					hashedPassword: "hashedpass2",
					birthdate: "1991-02-02",
					pastProjectLinks: [],
				},
			});

			user3 = await prisma.user.create({
				data: {
					firstName: "Charlie",
					lastName: "Tester",
					username: "charliet",
					email: "charlie@example.com",
					hashedPassword: "hashedpass3",
					birthdate: "1992-03-03",
					pastProjectLinks: [],
				},
			});

			// Create projects
			await prisma.project.createMany({
				data: [
					{ ownerId: user1.id, title: "Test Project 1", description: "Description A" },
					{ ownerId: user1.id, title: "Test Project 2", description: "Description B" },
					{ ownerId: user1.id, title: "Test Project 3", description: "Description C" },
					{ ownerId: user2.id, title: "Test Project 4", description: "Description D" },
					{ ownerId: user2.id, title: "Test Project 5", description: "Description E" },
					{ ownerId: user3.id, title: "Test Project 6", description: "Description F" },
					{ ownerId: user3.id, title: "Another Test Project", description: "Different Title" },
				],
			});
		});

		afterEach(async () => {
			await prisma.project.deleteMany(); // delete all projects
			await prisma.user.deleteMany(); // delete all users
		});
		it("should exist as GET /api/v1/projects", async () => {
			const res = await supertest(app).get(`${baseUrl}/projects`);
			expect(res.status).not.toBe(404);
		});

		describe("with no query params", () => {
			it("should return array of all projects in response object", async () => {
				const res = await supertest(app).get(`${baseUrl}/projects`);

				expect(res.body).toEqual({ data: expect.any(Array), error: null, success: true });
				expect(Array.isArray(res.body.data)).toBe(true);
			});
		});

		describe("given req.query params", () => {
			it("should return an array of records that match query", async () => {
				const res = await supertest(app).get(`${baseUrl}/projects`).query({ limit: "2", page: "1" });

				expect(res.status).toBe(200);
				expect(Array.isArray(res.body.data)).toBe(true);
				expect(res.body.data.length).toBeLessThanOrEqual(2);
				expect(res.body.data.some((p) => p.title.toLowerCase().includes("test project 2"))).toBe(true);
			});
		});
	});

	describe("getting a single project", () => {
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
			const id = project?.id || "project-123456"; // doesn't matter the route
			const res = await supertest(app).get(`${baseUrl}/projects/${id}`);
			expect(res.status).not.toBe(404);
		});
		it("should return 404, and error response if project doesn't exist", async () => {
			const projectId = "453804-cdsjisodjc-acdhaiuhi";
			const res = await supertest(app).get(`${baseUrl}/projects/${projectId}`);

			expect(res.status).toBe(404);
			expect(res.body).toEqual(failedResponse);
		});

		it("should return 200, project data, and appropriate response", async () => {
			const projectId = project?.id;
			const res = await supertest(app).get(`${baseUrl}/projects/${projectId}`);

			expect(res.status).toBe(200);
			expect(res.body).toEqual(successfulResponse);
		});
	});

	describe("creating a project", () => {
		let user;
		let token;

		beforeEach(async () => {
			// Create user
			const signupRes = await supertest(app).post(`${baseUrl}/auth/signup`).send({
				firstName: "Project",
				lastName: "Creator",
				username: "projcreator",
				email: "proj@example.com",
				password: "secure123",
				birthdate: "1994-06-15",
			});

			// Log in user
			const loginRes = await supertest(app).post(`${baseUrl}/auth/login`).send({
				credential: "proj@example.com",
				password: "secure123",
			});
			token = loginRes.body.data.token;
			user = signupRes.body;
		});

		afterEach(async () => {
			await prisma.project.deleteMany();
			await prisma.user.deleteMany();
		});
		it("should exist as POST /api/v1/projects", async () => {
			const res = await supertest(app).post(`${baseUrl}/projects`).set("Authorization", `Bearer ${token}`);
			expect(res.status).not.toBe(404);
		});
		it("should return 400 error obj if missing/invalid params", async () => {
			const res = await supertest(app)
				.post(`${baseUrl}/projects`)
				.send({
					title: "Missing ownerId",
					// no ownerId provided
				})
				.set("Authorization", `Bearer ${token}`);

			expect(res.status).toBe(400);
			expect(res.body).toEqual({
				data: null,
				error: expect.any(String),
				title: expect.any(String),
				errors: expect.any(Array),
				success: false,
			});
		});
		it("should return 201, and data in res object", async () => {
			const payload = {
				title: "New Project",
				description: "A project that tests creation",
				ownerId: user.id,
			};

			const res = await supertest(app)
				.post(`${baseUrl}/projects`)
				.set("Authorization", `Bearer ${token}`)
				.send(payload);

			expect(res.status).toBe(201);
			expect(res.body).toEqual({
				data: expect.objectContaining({
					id: expect.any(String),
					title: payload.title,
					description: payload.description,
					ownerId: user.id,
				}),
				error: null,
				success: true,
			});

			// Confirm creation in DB
			const project = await prisma.project.findUnique({ where: { id: res.body.data.id } });
			expect(project).not.toBeNull();
		});
	});

	describe("updating a project", () => {
		let userA;
		let userB;
		let tokenA;
		let tokenB;
		let project;

		beforeEach(async () => {
			// Create User A
			const signupResA = await supertest(app).post(`${baseUrl}/auth/signup`).send({
				firstName: "Alice",
				lastName: "Owner",
				username: "aliceowner",
				email: "alice@example.com",
				password: "alice123",
				birthdate: "1990-01-01",
			});
			const loginResA = await supertest(app).post(`${baseUrl}/auth/login`).send({
				credential: "alice@example.com",
				password: "alice123",
			});
			tokenA = loginResA.body.data.token;

			userA = signupResA.body;
			// Create User B
			const signupResB = await supertest(app).post(`${baseUrl}/auth/signup`).send({
				firstName: "Bob",
				lastName: "Intruder",
				username: "bobintruder",
				email: "bob@example.com",
				password: "bob123",
				birthdate: "1992-02-02",
			});
			const loginResB = await supertest(app).post(`${baseUrl}/auth/login`).send({
				credential: "bob@example.com",
				password: "bob123",
			});
			tokenB = loginResB.body.data.token;
			userB = signupResB.body;
			// Create a project for User A
			const projectRes = await supertest(app)
				.post(`${baseUrl}/projects`)
				.send({
					title: "Original Title",
					description: "Initial project",
					ownerId: userA.id,
				})
				.set("Authorization", `Bearer ${tokenA}`);
			project = projectRes.body.data;
		});

		afterEach(async () => {
			await prisma.project.deleteMany();
			await prisma.user.deleteMany();
		});

		it("should exist as PUT /api/v1/projects/:projectId", async () => {
			const res = await supertest(app)
				.put(`${baseUrl}/projects/${project.id}`)
				.set("Authorization", `Bearer ${tokenA}`);
			expect(res.status).not.toBe(404);
		});

		it("should only allow project owners to update given project", async () => {
			const res = await supertest(app)
				.put(`${baseUrl}/projects/${project?.id}`)
				.send({ title: "Unauthorized update", description: "yea dog", ownerId: userA.id })
				.set("Authorization", `Bearer ${tokenB}`);

			expect(res.status).toBe(403);
			expect(res.body.success).toBe(false);
		});

		it("should return 404 error object if project not found", async () => {
			const fakeId = "99999999-9999-9999-9999-999999999999"; // or random uuid
			const res = await supertest(app)
				.put(`${baseUrl}/projects/${fakeId}`)
				.send({ title: "Doesn't matter", description: "this won't work", ownerId: userA.id })
				.set("Authorization", `Bearer ${tokenA}`);
			expect(res.status).toBe(404);
			expect(res.body.success).toBe(false);
			expect(typeof res.body.error).toBe("string");
		});

		it("should return 200, plus res object with updated data", async () => {
			const res = await supertest(app)
				.put(`${baseUrl}/projects/${project.id}`)
				.send({ title: "Updated Title", description: "Updated Description" })
				.set("Authorization", `Bearer ${tokenA}`);

			expect(res.status).toBe(200);
			expect(res.body.success).toBe(true);
			expect(res.body.data.title).toBe("Updated Title");
			expect(res.body.data.description).toBe("Updated Description");
		});
	});
	describe("deleting a project", () => {
		let userA;
		let userB;
		let tokenA;
		let tokenB;
		let project;

		beforeEach(async () => {
			// Create User A
			const signupResA = await supertest(app).post(`${baseUrl}/auth/signup`).send({
				firstName: "Alice",
				lastName: "Owner",
				username: "aliceowner",
				email: "alice@example.com",
				password: "alice123",
				birthdate: "1990-01-01",
			});
			const loginResA = await supertest(app).post(`${baseUrl}/auth/login`).send({
				credential: "alice@example.com",
				password: "alice123",
			});
			tokenA = loginResA.body.data.token;

			userA = signupResA.body;
			// Create User B
			const signupResB = await supertest(app).post(`${baseUrl}/auth/signup`).send({
				firstName: "Bob",
				lastName: "Intruder",
				username: "bobintruder",
				email: "bob@example.com",
				password: "bob123",
				birthdate: "1992-02-02",
			});
			const loginResB = await supertest(app).post(`${baseUrl}/auth/login`).send({
				credential: "bob@example.com",
				password: "bob123",
			});
			tokenB = loginResB.body.data.token;
			userB = signupResB.body;
			// Create a project for User A
			const projectRes = await supertest(app)
				.post(`${baseUrl}/projects`)
				.send({
					title: "Original Title",
					description: "Initial project",
					ownerId: userA.id,
				})
				.set("Authorization", `Bearer ${tokenA}`);
			project = projectRes.body.data;
		});

		afterEach(async () => {
			await prisma.project.deleteMany();
			await prisma.user.deleteMany();
		});
		it("should exist as DELETE /api/v1/projects/:projectId", async () => {
			const res = await supertest(app)
				.delete(`${baseUrl}/projects/${project.id}`)
				.set("Authorization", `Bearer ${tokenA}`);

			expect(res.status).not.toBe(404);
		});

		it("should only allow project owners to delete given project", async () => {
			const res = await supertest(app)
				.delete(`${baseUrl}/projects/${project.id}`)
				.set("Authorization", `Bearer ${tokenB}`);

			expect(res.status).toBe(403);
			expect(res.body.success).toBe(false);
		});

		it("should return 404 error object if project not found", async () => {
			const res = await supertest(app)
				.delete(`${baseUrl}/projects/nonexistent-project-id`)
				.set("Authorization", `Bearer ${tokenA}`);

			expect(res.status).toBe(404);
			expect(res.body.error).toBe("Project not found");
		});

		it("should return 200, with no data, no error, success true", async () => {
			const res = await supertest(app)
				.delete(`${baseUrl}/projects/${project.id}`)
				.set("Authorization", `Bearer ${tokenA}`);

			expect(res.status).toBe(200);
			expect(res.body).toEqual({ data: { message: "Project deleted successfully" }, error: null, success: true });

			const check = await prisma.project.findUnique({ where: { id: project.id } });
			expect(check).toBeNull();
		});
	});
});
