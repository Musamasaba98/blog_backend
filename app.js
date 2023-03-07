import express from "express";
import userRouter from "./src/routes/user.route.js"
import postRouter from "./src/routes/post.route.js"
import categoryRouter from "./src/routes/category.route.js"
import errorHandler from "./src/middlewares/errorHandler.js";
import customError from "./src/utils/customError.js";


const app = express();


app.use("/static", express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "15kb" }));
app.use("/api/v1/user", userRouter)
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/categories", categoryRouter)
app.all("*", (req, res, next) => next(new customError(`Cant find ${req.originalUrl}`, 404))
);
app.use(errorHandler)

export default app;