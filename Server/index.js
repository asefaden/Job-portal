import dotenv from "dotenv";
dotenv.config({});
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/company.routes.js";
import jobRouter from "./routes/job.routes.js";
import applicantionRouter from "./routes/application.routes.js";

const app = express();

connectDB()

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'https://jop-portal.app.aletcloud.com',
    credentials: true,
}
app.use(cors(corsOptions));

app.get(["/", "/api"], (req, res) => {
    return res.status(200).json({
        message: "Welcome to the server",
        success: true
    });
})

const PORT = process.env.PORT || 3000;


app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicantionRouter);


app.listen(PORT, () => {
    
    console.log(`Server running at port ${PORT}`);
})
