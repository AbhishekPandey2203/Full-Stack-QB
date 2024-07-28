import mongoose from "mongoose";

// designing the schema
const postSchema = mongoose.Schema({
  topic: {
    type: String,
    require: [true, "Topic is required"],
  },

  question: {
    type: String,
    require: [true, "Question is required"],
  },

  answer: {
    type: String,
    require: [true, "Answer is required"],
  },
});

//model

const postModel = mongoose.model("QuestionPost", postSchema);
export default postModel;
// require:[true,"Topic is required"] : "Topic is required" agr kisne nhi nhi bhra toh ye show hoga
