import { prisma } from "../utils/prisma.js";
import { validateRequestBody } from "../utils/validations/validateRequestBody.js";
import { commentSchema } from "../utils/validations/zod-schemas.js";

// create a new comment
/**
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export const createComment = async (req, res, next) => {
	try {
		validateRequestBody(commentSchema, req, next);

		const comment = await prisma.comment.create({
			data: req.body,
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

		comments = await prisma.comment.findUnique({
			where: { projectId },
		});
        if (!comments){
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
    const { commentId} = req.params;
    try {
        validateRequestBody(commentSchema, req, next);
        const existingComment = await prisma.comment.findUnique({
            where: { id: commentId },
        })
        if(!existingComment){
            return res.status(404).json({ error: "Comment not found" });
        }
        if(existingComment.userId !== req.user.id){
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
}
