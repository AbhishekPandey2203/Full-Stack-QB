import Navbar from "./component/navbar/Navbar1";
import CreatePost from "./pages/createpost/CreatePost";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import SinglePost from "./pages/singlePost/SinglePost";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/updatepost/:postID" element={<CreatePost />} />
        <Route path="/" element={<Home />} />
        <Route path="/:postID" element={<SinglePost />} />
      </Routes>
    </>
  );
}

export default App;
