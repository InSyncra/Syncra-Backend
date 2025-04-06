import { Router } from "express";
import {
    createComment,
    deleteCommentById,
    getAllComments,
    getCommentsByProjectId,
    updateCommentById,
} from "../../controllers/commentControllers.js";
import { requireAuth } from "../../utils/auth.js";

const commentRoutes = Router();

// create a new comment
commentRoutes.post("/:projectId", requireAuth, createComment);

// get all comments
commentRoutes.get("/", getAllComments);

// get comment by project id
commentRoutes.get("/:id", getCommentsByProjectId);

// update comment
commentRoutes.put("/:commentId", requireAuth, updateCommentById);

// delete comment
commentRoutes.delete("/:id", requireAuth, deleteCommentById);


export default commentRoutes;
