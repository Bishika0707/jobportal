import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from "dotenv";
import connecttDB from './utils/db.js';
import userRoute from "./routes/user.route.js"
dotenv.config({});
 
const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));


const PORT = process.env.PORT || 3000;


app.use("/api/v1/user", userRoute);

// app.get("/", (req, res) => res.send("Hello World"));

// console.log(PORT);

// connecttDB().then(() => {
//     app.listen(PORT, () => {
//         console.log(`server running at port ${PORT}`);
//     });
// }).catch((err) => {
//     console.log("Database connection failed", err);
// });

app.listen(PORT,()=>{
    connecttDB();
    console.log(`server running at port ${PORT}`);
 });