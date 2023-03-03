import prisma from "../config/prisma.config.js";
import customError from "../utils/customError.js";
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
export const getAllPosts = tryToCatch(async (req, res) => {
    const posts = await prisma.post.findMany()
    res.status(200).json({ status: "success", results: posts.length, data: posts })
})

//Get a post
export const getPost = tryToCatch(async (req, res, next) => {
    const post = await prisma.post.findUnique({
        data: req.params.id
    })
    if (!post) {
        return next(new customError(`There is no post with that ID ${req.params.id}`, 404))
    }
    res.status(200).json({ status: "success", data: post })
})

//Update a post
export const updatePost = tryToCatch(async (req, res, next) => {
    const updatedPost = await prisma.post.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })
    if (!updatedPost) {
        return next(new customError(`There is no post with that ID ${req.params.id}`, 404))
    }
    res.status(200).json({ status: "success", data: updatedPost })
})

//Delete a post
export const deletePost = tryToCatch(async (req, res) => {

    const deletedPost = await prisma.post.delete({
        where: {
            id: req.params.id
        }
    })
    if (!deletedPost) {
        return next(new customError(`There is no post with that ID ${req.params.id}`, 404))
    }
    res.status(200).json({ status: "success", message: 'Post was successfully deleted', data: null })

}) 