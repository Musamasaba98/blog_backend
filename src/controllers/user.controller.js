import prisma from "../config/prisma.config.js";
import tryToCatch from "../utils/tryToCatch.js";
import bcrypt from 'bcryptjs'
import customError from "../utils/customError.js";


//Create a User
export const addUser = tryToCatch(async (req, res) => {
    const { email, name, password, age } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: {
            email,
            name,
            age,
            password: hashedPassword,
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

})

//Find all Users
export const findAllUsers = tryToCatch(async (req, res) => {
    const users = await prisma.user.findMany()
    res.status(200).json({ status: "success", results: users.length, data: users })
})

//Find a user
export const findUser = tryToCatch(async (req, res, next) => {

    const user = await prisma.user.findUnique({
        where: {
            id: req.params.id
        }
    })
    if (!user) {
        return next(new customError(`There is no user with that ID ${req.params.id}`, 404))
    }
    res.status(200).json({ status: "success", data: user })

})

//Update a User
export const updateUser = tryToCatch(async (req, res, next) => {

    const updatedUser = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })
    if (!updatedUser) {
        return next(new customError(`There is no user with that ID ${req.params.id}`, 404))
    }
    res.status(200).json({ status: "success", data: updatedUser })

})

//Delete a User
export const deleteUser = tryToCatch(async (req, res) => {
    const id = req.params.id
    const deletedUser = await prisma.user.delete({
        where: {
            id: id
        }
    })
    if (!deletedUser) {
        return next(new customError(`There is no user with that ID ${id}`, 404))
    }
    res.status(204).json({ status: "success", message: "User has successfully been deleted" })
}) 
