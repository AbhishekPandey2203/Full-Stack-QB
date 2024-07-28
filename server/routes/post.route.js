//making the route logic

import express from "express";
import {
  createPost,
  deletepost,
  getAllPosts,
  getonlysinglepost,
  updatepost,
} from "../controllers/post.controller.js";
//assign a variable name route

const router = express.Router();

//call kra router
// router.get("/", (req, res, next) => {
//   res.send("Hello Backendbfvfnjfnjgnj");
// });

//understand about the controller :
//controller hum islye bnte h jisme hum route pr jab koi aega toh router kya krega vo btate
//now upar wala code ekdam shi but messhy h hence we avoid and make a new file in controller

router.post("/createpost", createPost); //createPost ke controller function ka name h jo post create krega and store in db
router.get("/getallposts", getAllPosts); //getallposts saare post ko le
router.get("/getsinglepost", getonlysinglepost); //only singlepost dega nikal ke
router.delete("/deletepost", deletepost); //delete the post
router.put("/updatepost", updatepost);    //update the post 

export default router;
