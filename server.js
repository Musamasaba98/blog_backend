import express from "express"
import { PrismaClient } from '@prisma/client'
import dotenv from "dotenv-safe"
dotenv.config()

const app = express(),
    prisma = new PrismaClient(),
    PORT = process.env.PORT || 5000;

app.use(express.json())

app.post("/", async (req, res) => {
    const { email, name } = req.body
    const user = await prisma.user.create({
        data: {
            email,
            name
        }
    })
    res.json(user)
})
app.get("/", async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})
app.put("/", async (req, res) => {
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
})
app.delete("/:id", async (req, res) => {
    const id = req.params.id
    const deletedUser = await prisma.user.delete({
        where: {
            id: id
        }
    })
    res.json(deletedUser)
})
app.listen(PORT, () => console.log(`The database has loaded on port ${PORT}`))      