import prisma from "../config/prisma.config.js";

//Add a post
export const addCategory = async (req, res) => {
    try {
        const { name } = req.body
        const category = await prisma.category.create({
            data: {
                name
            }
        })
        res.status(201).json({ status: "success", data: category })
    } catch (error) {
        res.status(400).json({ status: "Failed", message: error.message })
    }
}

//Get all Posts
export const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany()
        res.status(200).json({ status: "success", results: categories.length, data: categories })
    } catch (error) {
        res.status(400).json({ status: "Bad Request", message: error.message })
    }
}

//Get a post
export const getCategory = async (req, res) => {
    try {
        const category = await prisma.category.findUnique({
            data: req.params.id
        })
        res.status(200).json({ status: "success", data: category })
    } catch (error) {
        res.status(400).json({ status: "Bad Request", message: error.message })
    }
}

//Update a post
export const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await prisma.category.update({
            where: {
                id: req.params.id
            },
            data: req.body
        })
        res.status(200).json({ status: "success", data: updatedCategory })
    } catch (error) {
        res.status(400).json({ status: "Bad Request", message: error.message })
    }
}

//Delete a post
export const deleteCategory = async (req, res) => {
    try {
        await prisma.post.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ status: "success" })
    } catch (error) {
        res.status(400).json({ status: "Bad Request", message: error.message })
    }
}