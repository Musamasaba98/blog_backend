import prisma from "../config/prisma.config.js";
import tryToCatch from "../utils/tryToCatch.js";
import { deleteOne, getAll, getOne, updateOne } from "./factory.controller.js";

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
export const getAllCategories = getAll("category")

//Get a post
export const getCategory = getOne("category")

//Update a post
export const updateCategory = updateOne("category")

//Delete a post
export const deleteCategory = deleteOne("category")