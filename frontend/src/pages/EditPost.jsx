import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import BlogPostForm from "../components/BlogPostForm/BlogPostForm";
import { fetchPost, postUpdate } from "../features/blogPost/blogPostAction";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, content, image } = useSelector((state) => state.blog);

  const handleUpdatePost = async () => {
    if (validatePost()) {
      const postedBy = localStorage.getItem("userId");
      const updatePostResult = await dispatch(
        postUpdate({ title, content, image, id, postedBy })
      );
      if (updatePostResult.meta.requestStatus === "fulfilled") {
        navigate(`/post/${id}`);
      }
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

  useEffect(() => {
    dispatch(fetchPost(id));
  }, []);

  return (
    <div>
      <NavBar hasHomeButton />
      <BlogPostForm
        handleSubmit={() => handleUpdatePost()}
        isEditPost
        pageTitle="Edit Post"
        buttonText="Update Post"
      />
      <Footer />
    </div>
  );
};

export default EditPost;
