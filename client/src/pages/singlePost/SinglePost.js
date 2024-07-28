import "./SinglePost.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SinglePost = () => {
  const [post, setPost] = useState({});

  //   =======//dekho ye jo use param h na ye islye ushe krte h bcz iske help se hi hume postid milega ye help krta h link m se data ko likalne m
  //   const params=useParams();  ----->ye bhi use kr skte h but phir destructure ke liye likhna hoga params.postId
  const { postID } = useParams(); //-->destructuing kr de h bs:useParams veryhelp link se data nikalne m   aur ek chej postID app.js m dekho vaha hume isse url m beja h

  //   ----------------------------------------------
  const navigate = useNavigate();
  const url = process.env.REACT_APP_SERVER_URL;

  const loadPosts = async () => {
    try {
      //postid param ki help se le h data liya ---isse bolte h backend se data mangna
      const response = await axios.get(`${url}/getsinglepost?postID=${postID}`);
      setPost(response?.data?.responseData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line
  }, []);

  //for delete the post --->using axios.delete

  const deletePost = async (e) => {
    e.preventDefault();

    // data:{postID} ase hi bejna hota h
    try {
      const response = await axios.delete(`${url}/deletepost`, {
        data: {
          postID,
        },
      });

      //agr delete toh navigate kro home page pe
      if (response?.data?.responseData) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Single-Post">
      <h1 className="topic">{post?.topic}</h1>
      <h2 className="question">{post?.question}</h2>
      <p className="answer">{post?.answer}</p>
      <div className="btns">
        {/* delete krne ke liye */}
        <button onClick={deletePost} className="btn btn-delete">
          Delete
        </button>

        {/* Update krna single post ko */}
        <button
          onClick={() => navigate(`/updatepost/${postID}`)}
          className="btn btn-update"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default SinglePost;
