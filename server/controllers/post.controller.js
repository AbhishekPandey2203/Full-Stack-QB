//making the controller.js

//import the model first

import PostModel from "../models/post.model.js";

//controller ke anadar

// ---
//createpost
const createPost = async (req, res, next) => {
  try {
    //to check the req.body
    //   console.log(req.body);

    // destructing the req.body

    const { topic, question, answer } = req.body;

    //a collection has
    const responseData = await PostModel.create({
      topic,
      question,
      answer,
    });
    //data send to database
    res.send({
      success: true,
      responseData,
    });
    //if not use async and await we get "responseData": {} in response when we send to avoid use aysn and await

    //ab request kr de ab aage ke liye jise server ruke nhi use next()
    next();
  } catch (error) {
    next(error);
  }
};

//getpost--------->A function for getting all the post
const getAllPosts = async (req, res, next) => {
  try {
    const { topic, question, answer } = req.body;

    //getting post use find of mongodb
    const responseData = await PostModel.find();
    res.send({
      success: true,
      responseData,
    });
  } catch (error) {
    next(error);
  }
};

//getonlysinglepost:-->function return the singlepost
const getonlysinglepost = async (req, res, next) => {
  try {
    const { postID } = req.query;

    // getting post using findById of MongoDB
    const responseData = await PostModel.findById(postID);

    if (!responseData) {
      return res.status(404).send({
        success: false,
        message: "Post not found",
      });
    }

    res.send({
      success: true,
      responseData,
    });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

//delete the post------->

const deletepost = async (req, res, next) => {
  try {
    const { postID } = req.body; //body se request milega vaha se id le lo

    // Delete post using findByIdAndDelete of MongoDB
    const responseData = await PostModel.findByIdAndDelete(postID); //find kro

    if (!responseData) {
      return res.status(404).send({
        success: false,
        message: "Post not found",
      });
    }

    res.send({
      success: true,
      message: "Post successfully deleted",
      responseData,
    });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

//update the post functionality let see how
const updatepost = async (req, res, next) => {
  try {
    //isse post ko update krna h toh uske liye we used
    const { postID, topic, question, answer } = req.body;

    // update post using findByIdAndDelete of MongoDB
    const responseData = await PostModel.findByIdAndUpdate(postID, {
      topic,
      question,
      answer,
    },{new:true});

    // why?{new:true}===because to always update the data and  response m agar newupdate data chye islye use kiya

    if (!responseData) {
      return res.status(404).send({
        success: false,
        message: "Post not found",
      });
    }

    res.send({
      success: true,
      message: "Post successfully update",
      responseData,
    });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

export { createPost, getAllPosts, getonlysinglepost, deletepost ,updatepost};
