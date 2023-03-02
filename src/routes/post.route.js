import express from "express"
import { authenticateToken } from "../controllers/auth.controller.js";
import { addPost, deletePost, getAllPosts, getPost, updatePost } from "../controllers/post.controller.js";


const router = express.Router()

router.route("/")
    .post(authenticateToken, addPost)
    .get(getAllPosts)
router.route("/:id")
    .get(getPost)
    .put(updatePost)
    .delete(deletePost)


export default router;