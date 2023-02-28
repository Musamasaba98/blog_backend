import express from "express"
import { addUser, deleteUser, findAllUsers, findUser, updateUser } from "../controllers/user.controller.js";
import validation from "../middlewares/validation.middleware.js";
import tryToCatch from "../utils/tryToCatch.js";

const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .post(validateRequest, tryToCatch(addUser))
    .get(tryToCatch(findAllUsers))
router.route("/:id")
    .get(tryToCatch(findUser))
    .put(tryToCatch(updateUser))
    .delete(tryToCatch(deleteUser))

export default router;


