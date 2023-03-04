import express from "express"
import { authenticateToken, restrictTo } from "../controllers/auth.controller.js";
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/category.controller.js";
import validation from "../middlewares/validation.middleware.js";


const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .post(authenticateToken, restrictTo(["ADMIN"]), validateRequest, addCategory)
    .get(getAllCategories)
router.route("/:id")
    .get(getCategory)
    .put(authenticateToken, restrictTo(["ADMIN"]), validateRequest, updateCategory)
    .delete(authenticateToken, restrictTo(["ADMIN"]), validateRequest, deleteCategory)


export default router;