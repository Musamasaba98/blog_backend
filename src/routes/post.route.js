import express from "express"
import { authenticateToken, restrictTo } from "../controllers/auth.controller.js";
import { addPost, deletePost, getAllPosts, getPost, updatePost } from "../controllers/post.controller.js";
import validation from "../middlewares/validation.middleware.js";

const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .post(authenticateToken, restrictTo(["ADMIN", "EDITOR"]), validateRequest, addPost)
    .get(getAllPosts)
router.route("/:id")
    .get(getPost)
    .put(authenticateToken, restrictTo(["ADMIN", "EDITOR"]), validateRequest, updatePost)
    .delete(authenticateToken, restrictTo(["ADMIN", "EDITOR"]), validateRequest, deletePost)


export default router;