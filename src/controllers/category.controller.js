import prisma from "../config/prisma.config.js";
import tryToCatch from "../utils/tryToCatch.js";

//Add a post
export const addCategory = tryToCatch(async (req, res) => {

    const { name } = req.body
    const category = await prisma.category.create({
        data: {
            name
        }

    })
    res.status(201).json({ status: "success", data: category })

})

//Get all Posts
export const getAllCategories = tryToCatch(async (req, res) => {

    const categories = await prisma.category.findMany()
    res.status(200).json({ status: "success", results: categories.length, data: categories })

})

//Get a post
export const getCategory = tryToCatch(async (req, res) => {

    const category = await prisma.category.findUnique({
        data: req.params.id
    })
    if (!category) {
        return next(new customError(`There is no category with that ID ${req.params.id}`, 404))
    }
    res.status(200).json({ status: "success", data: category })


})

//Update a post
export const updateCategory = tryToCatch(async (req, res, next) => {
    const updatedCategory = await prisma.category.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })
    if (!updatedCategory) {
        return next(new customError(`There is no Category with that ID ${req.params.id}`, 404))
    }
    res.status(200).json({ status: "success", data: updatedCategory })

})

//Delete a post
export const deleteCategory = async (req, res, next) => {

    const deleteCategory = await prisma.post.delete({
        where: {
            id: req.params.id
        }
    })
    if (!deletedCategory) {
        return next(new customError(`There is no Category with that ID ${req.params.id}`, 404))
    }
    res.status(200).json({ status: "success" })

}