import React from "react";
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

const CreatePost = () => {
  const dispatch = useDispatch();
  const { title, content, image } = useSelector((state) => state.blog);

  const handleSubmitPost = () => {
    if (validatePost()) {
      dispatch(postSubmit({ title, content, image }));
      dispatch(postTitle(""));
      dispatch(postContent(""));
      dispatch(postImage(""));
    } else {
      return;
    }
  };

  const validatePost = () => {
    if (title.trim() === "") {
      toast.error("Title is a required field");
      return false;
    }
    if (content.trim() === "") {
      toast.error("Content is a required field");
      return false;
    }
    return true;
  };

  return (
    <div>
      <NavBar hasHomeButton />
      <BlogPostForm handleSubmit={() => handleSubmitPost()} />
      <Footer />
    </div>
  );
};

export default CreatePost;
