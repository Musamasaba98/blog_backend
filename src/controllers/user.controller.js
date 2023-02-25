import prisma from "../config/prisma.config.js";

//Create a User
export const addUser = async (req, res) => {
    try {
        const { email, name, age } = req.body
        const user = await prisma.user.create({
            data: {
                email,
                name,
                age,
                userPreference: {
                    create: {
                        emailUpdates: true
                    }
                }
            }


        })
        res
            .status(201)
            .json({ status: "success", data: user });

    } catch (error) {
        res.status(400).json({ status: "Failed", message: error.message });
    }

}

//Find all Users
export const findAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json({ status: "success", results: users.length, data: users })
    } catch (error) {
        res.status(400).json({ status: "Not Found", message: error.message })
    }

}

//Find a user
export const findUser = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ status: "success", data: user })
    } catch (error) {
        res.status(400).json({ status: "Not Found", message: error.message })
    }
}

//Update a User
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: req.body
        })
        res.status(200).json({ status: "success", data: updatedUser })
    } catch (error) {
        res.status(400).json({ status: "Bad Request", message: error.message })
    }

}

//Delete a User
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        await prisma.user.delete({
            where: {
                id: id
            }
        })
        res.status(204).json({ status: "success" })
    } catch (error) {
        res.status(400).json({ status: "Failed", message: error.message })
    }

}
