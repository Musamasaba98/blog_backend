import dotenv from "dotenv-safe"
import app from "./app.js";


dotenv.config();


const PORT = process.env.PORT || 6000;
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception: ", err.message);
    console.log("Closing server now...");
    process.exit(1);
});

app.listen(PORT, () => console.log(`The database has loaded on port ${PORT}`))

process.on("unhandledRejection", (err) => {
    console.log(err);
    console.log("Closing server now...");
    server.close(() => {
        process.exit(1);
    });
});
process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully");
    server.close(() => {
        console.log("Closed out remaining connections");
        process.exit(0);
    });
});