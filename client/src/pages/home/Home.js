import "./Home.css";
import React, { useEffect, useState } from "react";
import Card from "./Card";

//importing the axios for api se data fetch krne ke liye
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState();
  const url = process.env.REACT_APP_SERVER_URL;

  //Ye jo loadpost function ye help krega backende se data le anae m with the help of axios
  const loadPosts = async () => {
    try {
      //ye response h na ye ek object return krega ushme data ke anadar:responseData hota
      //h vo ek array type hota h hence ushe m hmare saare data hota h(e.g. response.data.responseData)
      const response = await axios.get(`${url}/getallposts`);
      // ----------

      //ab jo backend se data aya h vo ek object aur ushme jo actual data h vo padha h response.data.responseData m smj-responseData
      //ye ek array ko consist krega jisme topic answer question h

      setPosts(response.data.responseData); //yaha pe humne ushe data ko setpost m dal diya bcz ye ek react variable
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  //ek function h jo call hoga when change occur

  useEffect(() => {
    loadPosts();
      // eslint-disable-next-line
  }, []); //empty bcz ek baar run krne ke liye

  return (
    <div className="Home">
      {/* to display fetch data we used map :_id*/}
      {posts?.map((post) => {
        return <Card key={post?._id} post={post} />;
      })}
    </div>
  );
};

export default Home;
