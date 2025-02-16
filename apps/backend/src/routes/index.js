import { prisma } from "@repo/db";
import { Router } from "express";

const routes = Router();

routes.get("/", async (req, res) => {
	res.send(
		`<h1>Welcome to Syncra backend!</h1> <p>This project is designed for authorized users to clone and access the codebase. Instructions will be posted soon.</p>`,
	);
});

export default routes;
