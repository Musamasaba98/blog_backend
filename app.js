import express from "express";
import userRouter from "./src/routes/user.route"
import postRouter from "./src/routes/post.route"

const app = express();

app.use("/static", express.static("./src/public"));
app.use(express.json());
app.use("/user", userRouter)
app.use("/posts", postRouter)

app.all("*", (req, res) => res.status(404).send("Page not found"));
export default app