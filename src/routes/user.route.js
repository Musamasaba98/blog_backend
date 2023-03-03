import express from "express"
import { login, signup, token } from "../controllers/auth.controller.js";
import { deleteUser, findAllUsers, findUser, updateUser } from "../controllers/user.controller.js";
import validation from "../middlewares/validation.middleware.js";
import tryToCatch from "../utils/tryToCatch.js";

const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .get(tryToCatch(findAllUsers))
router.route("/:id")
    .get(tryToCatch(findUser))
    .put(tryToCatch(updateUser))
    .delete(tryToCatch(deleteUser))
router.post('/token', token)
router.post("/login", login)
router.post("/signup", validateRequest, signup)
export default router;


