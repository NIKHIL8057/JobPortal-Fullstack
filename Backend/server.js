import express from "express"
import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import { connectDB } from "./config/db.js";
import userRouter from "./router/user.router.js"
import companyRouter from "./router/company_router.js"
import JobRouter from "./router/job.router.js"
import cookieParser from "cookie-parser";
import applicationRouter from "./router/application.router.js"
import mentorRouter from "./router/mentor.router.js"


const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// app.use(cors({
//   origin: 'https://jobportal-mernstack-1.onrender.com', 
//   credentials: true
// }));

app.use(cookieParser());

// DataBase connection
connectDB();

const port = process.env.PORT || 5000

// api 
app.use("/api/v1/user",userRouter);
app.use("/api/v1/company",companyRouter);
app.use("/api/v1/job",JobRouter);
app.use("/api/v1/application",applicationRouter)
app.use("/api/v1/mentor", mentorRouter);

app.get("/",(req,res) => {
    res.send("server is ready");
})

app.listen(port,() => {
    console.log(`Server is runnng ${port}`);
})