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
projectRoutes.post("/", createProject);

// get all projects
projectRoutes.get("/", getAllProjects);

// get project by id
projectRoutes.get("/:id", getProjectById);

// update project
projectRoutes.put("/:id", updateProjectById);

// delete project
projectRoutes.delete("/:id", deleteProjectById);

export default projectRoutes;
