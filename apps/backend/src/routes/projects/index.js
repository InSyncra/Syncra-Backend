import { Router } from "express";
import {
	createProject,
	deleteProjectById,
	getAllProjects,
	getProjectById,
	updateProjectById,
} from "../../controllers/projectsControllers.js";
import { requireAuth } from "../../utils/auth.js";


const projectRoutes = Router();



// create a new project
projectRoutes.post("/", requireAuth, createProject);

// get all projects
projectRoutes.get("/", getAllProjects);

// get project by id
projectRoutes.get("/:id", getProjectById);

// update project
projectRoutes.put("/:id", requireAuth, updateProjectById);

// delete project
projectRoutes.delete("/:id", requireAuth, deleteProjectById);

export default projectRoutes;
