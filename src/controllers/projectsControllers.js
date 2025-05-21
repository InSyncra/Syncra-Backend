import { prisma } from "../lib/prisma.js";
import { sendSuccessResponse } from "../utils/responses.js";

/**
 * create a new project
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export const createProject = async (req, res, next) => {
	try {
		const project = await prisma.project.create({
			data: {
				...req.body,
				ownerId: req.user.id,
			},
		});
		sendSuccessResponse(res, { data: project, status: 201 });
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
		sendSuccessResponse(res, { data: projects });
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

		// if (!project) {
		// 	return sendErrorResponse(res, { error: "Project not found", status: 404 });
		// }

		sendSuccessResponse(res, { data: project });
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
	// const { id: userId } = req.user;

	try {
		// const existingProject = await prisma.project.findUnique({
		// 	where: { id: projectId },
		// });

		// if (!existingProject) {
		// 	return sendErrorResponse(res, { error: "Project not found" });
		// }

		// Only currently logged in user that created the project can update project
		// if (userId !== existingProject.ownerId) return res.status(403).json(sendResponse({ error: "Forbidden" }));

		const updatedProject = await prisma.project.update({
			where: { id: projectId },
			data: req.body,
		});

		sendSuccessResponse(res, { data: updatedProject, message: `${req.user.email} Updated Project ${projectId}` });
		// res.json(sendResponse({ data: updatedProject }));
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
		// if (!existingProject) {
		// 	return res.status(404).json(sendResponse({ error: "Project not found" }));
		// }

		// if (userId !== existingProject.ownerId) return res.status(403).json(sendResponse({ error: "Forbidden" }));

		await prisma.project.delete({
			where: { id: projectId },
		});
		res.status(200).json(sendResponse({ data: { message: "Project deleted successfully" } }));
	} catch (error) {
		next(error);
	}
};
