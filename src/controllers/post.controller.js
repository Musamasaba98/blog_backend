import prisma from "../config/prisma.config.js";
import tryToCatch from "../utils/tryToCatch.js";
import { deleteOne, getAll, getOne, updateOne } from "./factory.controller.js";

//Add a post
export const addPost = tryToCatch(async (req, res) => {
    const { email } = req.user
    const { averageRating, title, content, categories } = req.body
    const post = await prisma.post.create({
        data: {
            averageRating,
            title,
            content,
            author: {
                connect: {
                    email: email
                }
            },
            categories: {
                connect: categories.map(name => ({ name }))
            }
        }
    })

    res.status(201).json({ status: "success", data: post })
})

//Get all Posts
export const getAllPosts = getAll("post")

//Get a post
export const getPost = getOne("post")

//Update a post
export const updatePost = updateOne("post")

//Delete a post
export const deletePost = deleteOne("post")