// import { requireAuth } from "../../utils/auth.js";
import { requireAuth } from "@clerk/express";
import { Router } from "express";
import {
	createProject,
	deleteProjectById,
	getAllProjects,
	getProjectById,
	updateProjectById,
} from "../../controllers/projectsControllers.js";

const projectRoutes = Router();

// create a new project
projectRoutes.post("/", requireAuth({ signInUrl: "/sign-in" }), createProject);

// get all projects
projectRoutes.get("/", getAllProjects);

// get project by id
projectRoutes.get("/:id", getProjectById);

// update project
projectRoutes.put("/:id", requireAuth({ signInUrl: "/sign-in" }), updateProjectById);

// delete project
projectRoutes.delete("/:id", requireAuth({ signInUrl: "/sign-in" }), deleteProjectById);

export default projectRoutes;
