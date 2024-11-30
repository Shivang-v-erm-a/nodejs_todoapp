import express from 'express';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import cors from "cors";

export const app = express();

config({
    path: "./data/config.env",
})

//using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

//using routes
app.use("/users", userRouter);//we can add prefix too if we use routes
app.use("/task", taskRouter);

app.get("/", (req,res)=>{
    res.send("nice")
})

app.use(errorMiddleware);