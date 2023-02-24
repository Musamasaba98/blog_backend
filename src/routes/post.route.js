import express from "express"
import prisma from "./src/config/prisma.config";

const router = express.Router()

router.route("/post").get(async (req, res) => {

})

export default router;