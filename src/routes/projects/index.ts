// import { requireAuth } from "../../utils/auth"
import { Router } from "express";
import {
	createProject,
	deleteProjectById,
	getAllProjects,
	getProjectById,
	updateProjectById,
} from "../../controllers/projectsControllers"
import { requireAuth } from "../../middlewares/auth"
import { checkResourceExists, checkResourceOwnership, validate } from "../../middlewares/validate"
import { ProjectSchema } from "../../schemas/project"

const projectRoutes = Router();

// create a new project
projectRoutes.post("/", requireAuth, validate(ProjectSchema), createProject);

// get all projects
projectRoutes.get("/", getAllProjects);

// get project by id
projectRoutes.get("/:id", checkResourceExists("project"), getProjectById);

// update project
projectRoutes.put(
	"/:id",
	requireAuth,
	checkResourceExists("project"),
	checkResourceOwnership("project"),
	updateProjectById,
);

// delete project
projectRoutes.delete(
	"/:id",
	requireAuth,
	checkResourceExists("project"),
	checkResourceOwnership("project"),
	deleteProjectById,
);

export default projectRoutes;
