import express from "express"
import prisma from "./src/config/prisma.config";

const router = express.Router()

router.route("/").post(async (req, res) => {
    const { email, name } = req.body
    const user = await prisma.user.create({
        data: {
            email,
            name
        }
    })
    res.json(user)
}).get(async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})
router.route("/:id").put(async (req, res) => {
    const { id, name, email } = req.body
    const updatedUser = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            email,
            name
        }
    })
    res.json(updatedUser)
}).delete(async (req, res) => {
    const id = req.params.id
    const deletedUser = await prisma.user.delete({
        where: {
            id: id
        }
    })
    res.json(deletedUser)
})

export default router;


