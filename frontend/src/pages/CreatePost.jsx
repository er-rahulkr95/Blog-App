import React, { useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import BlogPostForm from "../components/BlogPostForm/BlogPostForm";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postSubmit } from "../features/blogPost/blogPostAction";
import {
  postContent,
  postImage,
  postTitle,
} from "../features/blogPost/blogPostSlice";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, content, image } = useSelector((state) => state.blog);

  const handleSubmitPost = async () => {
    if (validatePost()) {
     let submitResult = await dispatch(postSubmit({ title, content, image }));
     if (submitResult.meta.requestStatus === "fulfilled") {
          dispatch(postTitle(""));
          dispatch(postContent(""));
          dispatch(postImage(""));
     }
     
    } else {
      return;
    }
  };

  const validatePost = () => {
    if (title.trim() === "") {
      toast.warn("Title is a required field");
      return false;
    }
    if (content.trim() === "") {
      toast.warn("Content is a required field");
      return false;
    }
    if (image.trim() === "") {
      toast.warn("Please upload one image");
      return false;
    }
    return true;
  };

  useEffect(()=>{
            if(!localStorage.getItem("token")){
                toast.error("Please Login To Create a New Post");
                navigate("/login")
            }
  },[])

  return (
    <div>
      <NavBar hasHomeButton />
      <BlogPostForm handleSubmit={() => handleSubmitPost()} />
      <Footer />
    </div>
  );
};

export default CreatePost;
