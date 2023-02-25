import express from "express"
import { addUser, deleteUser, findAllUsers, findUser, updateUser } from "../controllers/user.controller.js";



const router = express.Router()

router.route("/")
    .post(addUser)
    .get(findAllUsers)
router.route("/:id")
    .get(findUser)
    .put(updateUser)
    .delete(deleteUser)

export default router;


