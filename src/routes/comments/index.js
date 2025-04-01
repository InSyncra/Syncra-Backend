import { Router } from "express";
import {
    createComment,
    deleteCommentById,
    getAllComments,
    getCommentsByProjectId,
    updateCommentById,
} from "../../controllers/commentsControllers.js";
import { requireAuth } from "../../utils/auth.js";

const commentRoutes = Router();

// create a new comment
commentRoutes.post("/", requireAuth, createComment);

// get all comments
commentRoutes.get("/", getAllComments);

// get comment by project id
commentRoutes.get("/:id", getCommentsByProjectId);

// update comment
commentRoutes.put("/:id", requireAuth, updateCommentById);

// delete comment
commentRoutes.delete("/:id", requireAuth, deleteCommentById);


export default commentRoutes;
