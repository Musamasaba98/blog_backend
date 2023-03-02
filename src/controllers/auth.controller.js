import prisma from "../config/prisma.config.js";
import tryToCatch from "../utils/tryToCatch.js";
import jwt from "jsonwebtoken";
import customError from "../utils/customError.js";
import bcrypt from 'bcryptjs'
import exclude from "../utils/prisma.exclude.js";

export const login = tryToCatch(async (req, res, next) => {
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })

    if (user === null) {
        return next(new customError("User not Found", 400))
    } else {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const userWithoutPassword = exclude(user, 'password')
            const accessToken = jwt.sign(userWithoutPassword, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" })
            const refreshT = jwt.sign(userWithoutPassword, process.env.REFRESH_TOKEN_SECRET)
            const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            const clientId = "myapp"
            const refreshToken = await prisma.refreshToken.create({
                data: {
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    clientId,
                    token: refreshT,
                    expiresAt
                }
            })
            res.status(200).json({ status: "success", accessToken, refreshToken })
        } else {
            next(new customError("Password or Email is incorrect", 401))
        }
    }
})
export const token = tryToCatch(async (req, res, next) => {
    const { refreshToken } = req.body;
    const refreshTokenData = await prisma.refreshToken.findFirst({
        where: {
            token: refreshToken,
            clientId: "myapp",
            revoked: false,
            expiresAt: { gte: new Date() }
        },
        include: { user: true },
    });

    if (!refreshTokenData) {
        return next(new customError("Invalid request", 401));
    }

    const accessToken = jwt.sign(refreshTokenData.user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
    res.status(200).json({ accessToken });
})
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return next(new customError("You are not authorized to access this route", 401))
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return next(new customError("Invalid Token", 403))
        req.user = user
        next()
    })
}