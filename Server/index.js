import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/company.routes.js";
import jobRouter from "./routes/job.routes.js";
import applicantionRouter from "./routes/application.routes.js";
import mongoose from "mongoose"; // Import mongoose
dotenv.config({});

const app = express();

// Set Mongoose global options to increase timeouts
mongoose.set('serverSelectionTimeoutMS', 60000); // Increase server selection timeout to 60 seconds
mongoose.set('socketTimeoutMS', 60000);        // Increase socket timeout to 60 seconds
mongoose.set('bufferTimeoutMS', 60000);       // Increase buffering timeout to 60 seconds

connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'https://job-portal1.app.aletcloud.com',
    credentials: true,
}
app.use(cors(corsOptions));

app.get("/api",(req,res)=>{
    res.send("Welcome to the server");
})

const PORT = process.env.PORT || 3000;


app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicantionRouter);


app.listen(PORT, () => {
    
    console.log(`Server running at port ${PORT}`);
});

export default app;