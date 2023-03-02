import prisma from "../config/prisma.config.js";
import tryToCatch from "../utils/tryToCatch.js";

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
export const getAllPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany()
        res.status(200).json({ status: "success", results: posts.length, data: posts })
    } catch (error) {
        res.status(400).json({ status: "Bad Request", message: error.message })
    }
}

//Get a post
export const getPost = async (req, res) => {
    try {
        const post = await prisma.post.findUnique({
            data: req.params.id
        })
        res.status(200).json({ status: "success", data: post })
    } catch (error) {
        res.status(400).json({ status: "Bad Request", message: error.message })
    }
}

//Update a post
export const updatePost = async (req, res) => {
    try {
        const updatedPost = await prisma.post.update({
            where: {
                id: req.params.id
            },
            data: req.body
        })
        res.status(200).json({ status: "success", data: updatedPost })
    } catch (error) {
        res.status(400).json({ status: "Bad Request", message: error.message })
    }
}

//Delete a post
export const deletePost = async (req, res) => {
    try {
        await prisma.post.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ status: "success", results: posts.length, data: posts })
    } catch (error) {
        res.status(400).json({ status: "Bad Request", message: error.message })
    }
}