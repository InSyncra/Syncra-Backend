import { prisma } from "@repo/db";
import { validateRequestBody } from "../utils/validations/zod-error-formatter.js";
import { projectSchema } from "../utils/validations/zod-schemas.js";

/**
 * create a new project
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export const createProject = async (req, res, next) => {
	try {
		validateRequestBody(projectSchema, req, next);
		const project = await prisma.project.create({
			data: req.body,
		});
		res.status(201).json(project);
	} catch (error) {
		next(error);
	}
};

// TODO: Add req.query params to handle filtering and pagination
/**
 * get all projects
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export const getAllProjects = async (req, res, next) => {
	try {
		const projects = await prisma.project.findMany();
		res.json(projects);
	} catch (error) {
		next(error);
	}
};

/**
 * get project by id
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export const getProjectById = async (req, res, next) => {
	try {
		const { id } = req.params;

		const project = await prisma.project.findUnique({
			where: { id },
		});

		if (!project) {
			return res.status(404).json({ error: "Project not found" });
		}
		res.json(project);
	} catch (error) {
		next(error);
	}
};

/**
 * update project
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export const updateProjectById = async (req, res, next) => {
	const { id: projectId } = req.params;
	const { id: userId } = req.user;

	try {
		validateRequestBody(projectSchema);
		const existingProject = await prisma.project.findUnique({
			where: { id: projectId },
		});

		if (!existingProject) {
			return res.status(404).json({ error: "Project not found" });
		}

		// Only currently logged in user that created the project can update project
		if (userId !== existingProject.ownerId) return res.status(403).json({ message: "Forbidden" });

		const updatedProject = await prisma.project.update({
			where: { id: projectId },
			data: req.body,
		});

		res.json(updatedProject);
	} catch (error) {
		next(error);
	}
};

/**
 * delete project
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export const deleteProjectById = async (req, res, next) => {
	try {
		const { id: projectId } = req.params;
		const { id: userId } = req.user;

		const existingProject = await prisma.project.findUnique({
			where: { id: projectId },
		});
		if (!existingProject) {
			return res.status(404).json({ error: "Project not found" });
		}

		if (userId !== existingProject.ownerId) return res.status(403).json({ message: "Forbidden" });

		await prisma.project.delete({
			where: { id: projectId },
		});
		res.status(200).json({ message: "Project deleted successfully" });
	} catch (error) {
		next(error);
	}
};
