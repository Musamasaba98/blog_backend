import express from "express"
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/category.controller.js";



const router = express.Router()

router.route("/")
    .post(addCategory)
    .get(getAllCategories)
router.route("/:id")
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory)


export default router;