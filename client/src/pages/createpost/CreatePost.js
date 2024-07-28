import React, { useEffect, useState } from "react";
import "./CreatePost.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

//Isme sikhenga case post ko frontend bante h --->bcz ab tk backend se bnya tha with localhost now ab
//with frontend kase let understand

const CreatePost = () => {
  const [heading, setHeading] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();  //for navigation
  const { postID } = useParams();   //vhi link se lena 
  const url = process.env.REACT_APP_SERVER_URL;

  //ye loadpost function post ko update krne ke liye h
  //post ko edit krne ke liye use hoga

  const loadPosts = async () => {
    try {
      const response = await axios.get(`${url}/getsinglepost?postID=${postID}`);
      const post = response?.data?.responseData;  //smje data milega yaad h na isse

      //createpost m by default first time m id nhi hoga but agr koi update button pe click kr deta h 
      //then vo apne sath ek postidleke ayegaa --then ye wala function call hoga
      //ab post apne sath topic question answer sab laya h

      //then agr h mean existing ko update kr do
      if (post) {
        setHeading(post?.topic);
        setQuestion(post?.question);
        setAnswer(post?.answer);
      }
      console.log(post);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (postID) {
      console.log("loadin post...");
      loadPosts();
    }
    // eslint-disable-next-line
  }, [postID]);

   // eslint-disable-next-line===use hote [] issme jo error aata h usko remove krne ke liye





  //Now let understand about the procedure to understand kase frontend se post create krenge

  const submitDetails = async (e) => {
    e.preventDefault();
    try {
      if (!postID) {
        //backend m data bejne ke liye--->schema ke according
        const response = await axios.post(`${url}/createpost`, {
          topic: heading,
          question,
          answer,
        });


        if (response?.data?.responseData) {
          setHeading("");
          setQuestion("");
          setAnswer("");
          navigate("/"); //navigate kra do homepage agr successfully post hogya h toh
        }
      } else {
        const response = await axios.put(`${url}/updatepost`, {
          postID,
          topic: heading,
          question,
          answer,
        });
        if (response?.data?.responseData) {
          setHeading("");
          setQuestion("");
          setAnswer("");
          navigate(`/${postID}`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-post">
      <h1 className="create-post__title">Create a New Post</h1>
      <form className="create-post__form">
        <div className="create-post__field">
          <label htmlFor="heading" className="create-post__label">
            Heading:
          </label>
          <input
            type="text"
            id="heading"
            className="create-post__input"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            required
          />
        </div>
        <div className="create-post__field">
          <label htmlFor="question" className="create-post__label">
            Question:
          </label>
          <textarea
            id="question"
            className="create-post__textarea"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className="create-post__field">
          <label htmlFor="answer" className="create-post__label">
            Answer:
          </label>
          <textarea
            id="answer"
            className="create-post__textarea"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>
        <button
          onClick={submitDetails}
          type="submit"
          className="create-post__submit"
        >
          {postID ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

//create post as well as update post both