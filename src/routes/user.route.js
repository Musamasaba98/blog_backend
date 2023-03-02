import express from "express"
import { login, token } from "../controllers/auth.controller.js";
import { addUser, deleteUser, findAllUsers, findUser, updateUser } from "../controllers/user.controller.js";
import validation from "../middlewares/validation.middleware.js";
import tryToCatch from "../utils/tryToCatch.js";

const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .post(validateRequest, addUser)
    .get(tryToCatch(findAllUsers))
router.route("/:id")
    .get(tryToCatch(findUser))
    .put(tryToCatch(updateUser))
    .delete(tryToCatch(deleteUser))
router.post('/token', token)
router.route("/login").post(login)
export default router;


