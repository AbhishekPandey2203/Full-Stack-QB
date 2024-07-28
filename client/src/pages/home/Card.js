import React from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";

//props pass kr diya
const Card = ({ post }) => {
  const navigate = useNavigate(); //use navigate inside bcz of single post open krne ke liye click krne pe

  return (
    // onclick pe navigate ho jaye singlepost open ho jaye 
    <div className="card" onClick={() => navigate(`/${post?._id}`)}> 
      <h2 className="card__heading">{post?.topic}</h2>
      <div className="card__content">
        <p className="card__question">{post?.question}</p>
        <p className="card__answer">{post?.answer}</p>
      </div>
    </div>
  );
};

export default Card;
