import express from "express"
import prisma from "../config/prisma.config.js";

const router = express.Router()

router.route("/post").get(async (req, res) => {

})

export default router;