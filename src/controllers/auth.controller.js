import prisma from "../config/prisma.config.js";
import tryToCatch from "../utils/tryToCatch.js";
import jwt from "jsonwebtoken";
import customError from "../utils/customError.js";
import bcrypt from 'bcryptjs'
import exclude from "../utils/prisma.exclude.js";

//Create a User
export const signup = tryToCatch(async (req, res) => {
    const { email, name, password, age, role } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: {
            email,
            name,
            age,
            password: hashedPassword,
            role,
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
            const accessToken = jwt.sign(userWithoutPassword, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
            const refreshT = jwt.sign(userWithoutPassword, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" })
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
    if (!refreshTokenData.user) {
        return next(new customError("Invalid user data", 400));
    }
    const accessToken = jwt.sign(refreshTokenData.user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    res.status(200).json({ accessToken });
})
export const authenticateToken = tryToCatch(async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return next(new customError("You are not authorized to access this route", 401))
    const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if (!user) {
        next(new customError("Invalid Token", 403))
    }
    req.user = user
    next()
})

export const restrictTo = (roles) => ((req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ status: 403, error: 'You dont have permission to access this action' })
    }
    // call next function to move on to the next middleware
    next()
})