import express from "express"
import { addUser, deleteUser, findAllUsers, findUser, updateUser } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import tryToCatch from "../utils/tryToCatch.js";
import { user } from "../validation.js";


// const post = (req, res) => {

// }
// const get = (req, res) => {

// }
const router = express.Router()

// router.route("/user").post(post).get(get)

router.route("/")
    .post(validate(user), addUser)
    .get(tryToCatch(findAllUsers))
router.route("/:id")
    .get(tryToCatch(findUser))
    .put(tryToCatch(updateUser))
    .delete(tryToCatch(deleteUser))

export default router;


