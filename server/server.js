// In this we are learning the fundamentals of our backend

//main file h humre server.js
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import express from "express";
import PostRoute from "./routes/post.route.js";
import { connectWithMongoose } from "./db/conncetion1.js";
import { createPost } from "./controllers/post.controller.js";

import cors from "cors";

const app = express();

//connceting the database----->
connectWithMongoose();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
); //vahi cors policy ke liye as iske use krke isne saare origin ko allow kr diya jo ab backend pe request de skti h

//jase database se connect ho jaye vase bhai data ko json m krna h then
app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

//Yha pe route ki call---------->

//now jo mera route h ushe use krne ke liye  --->mtlb call hogi asa /api/v1/routename
app.use("/api/v1", PostRoute);

//now understand to implement the server -->mean / pe kuch dekhe is done
app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});

//making the server
app.listen(8000, () => {
  //serverlisten print
  console.log("Server is listening at port no 8000");
});

//now ab koi change krenge toh server ko dobra start krenge to avoid it we used
//the nodemon it automatically server start krdega
