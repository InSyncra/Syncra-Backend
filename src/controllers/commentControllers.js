import { prisma } from "../utils/prisma.js";
import { validateRequestBody } from "../utils/validations/zod-error-formatter.js";
import { commentSchema } from "../utils/validations/zod-schemas.js";

// create a new comment
/**
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export const createComment = async (req, res, next) => {
	const { id: userId } = req.user;
	const { body } = req.body;

	try {
		// Now validate the sanitized body
		validateRequestBody(commentSchema, req, next);

		// Get projectId from route parameters or session instead of req.body
		const projectIdFromParams = req.params.projectId;
		const existingProject = await prisma.project.findUnique({
			where: { id: projectIdFromParams },
		});
		if (!existingProject) {
			return res.status(404).json({ error: "Project not found" });
		}

		const commentData = {
			projectId: projectIdFromParams,
			userId,
			body,
		};

		const comment = await prisma.comment.create({
			data: commentData,
		});
		res.status(201).json(comment);
	} catch (error) {
		next(error);
	}
};

//get all comments
/**
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export const getAllComments = async (req, res, next) => {
	try {
		const comment = await prisma.comment.findMany();
		res.json(comment);
	} catch (error) {
		next(error);
	}
};

//get all comment by project id
/**
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export const getCommentsByProjectId = async (req, res, next) => {
	try {
		const { projectId } = req.params;

		const comments = await prisma.comment.findMany({
			where: { projectId },
		});
		if (!comments) {
			return res.status(404).json({ error: "Comments not found" });
		}
		res.json(comments);
	} catch (error) {
		next(error);
	}
};

//update comment
/**
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export const updateCommentById = async (req, res, next) => {
	const { commentId } = req.params;
	try {
		validateRequestBody(commentSchema, req, next);
		const existingComment = await prisma.comment.findUnique({
			where: { id: commentId },
		});
		if (!existingComment) {
			return res.status(404).json({ error: "Comment not found" });
		}
		if (existingComment.userId !== req.user.id) {
			return res.status(403).json({ error: "You are not authorized to update this comment" });
		}
		const updatedComment = await prisma.comment.update({
			where: { id: commentId },
			data: req.body,
		});
		res.json(updatedComment);
	} catch (error) {
		next(error);
	}
};

//delete comment
/**
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export const deleteCommentById = async (req, res, next) => {
	const { id } = req.params;
	try {
		const existingComment = await prisma.comment.findUnique({
			where: { id },
		});
		if (!existingComment) {
			return res.status(404).json({ error: "Comment not found" });
		}
		if (existingComment.userId !== req.user.id) {
			return res.status(403).json({ error: "You are not authorized to delete this comment" });
		}
		await prisma.comment.delete({
			where: { id },
		});
		res.status(200).json({ message: "Comment deleted successfully" });
	} catch (error) {
		next(error);
	}
};
