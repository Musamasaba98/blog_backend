import express from "express"
import { addPost, deletePost, getAllPosts, getPost, updatePost } from "../controllers/post.controller";


const router = express.Router()

router.route("/")
    .post(addPost)
    .get(getAllPosts)
router.route("/:id")
    .get(getPost)
    .put(updatePost)
    .delete(deletePost)


export default router;