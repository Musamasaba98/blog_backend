import prisma from "../config/prisma.config.js";
import tryToCatch from "../utils/tryToCatch.js";
import jwt from "jsonwebtoken";
import customError from "../utils/customError.js";
import bcrypt from 'bcryptjs'

export const login = tryToCatch(async (req, res, next) => {
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })
    if (user === null) {
        return next(new customError("User not Found", 400))
    }
    await bcrypt.compare(req.body.password, user.password) ?
        res.status(200).json({ status: "success", data: user }) : next(new customError("Password is incorect", 401))
    // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)) 
    // res.json({ accessToken: accessToken })
})

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}