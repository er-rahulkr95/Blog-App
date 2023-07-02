import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import BlogPostForm from '../components/BlogPostForm/BlogPostForm';

const EditPost = () => {
 
  const dispatch = useDispatch();
  const { title,content,image } = useSelector((state) => state.blog);
  
  const handleUpdatePost =()=>{

    if(validatePost()){
      dispatch(postUpdate({title,content,image}))
    }else{
      return
    }               
  }


    const validatePost = ()=>{
      if (title.trim() === "") {
        toast.error("Title is a required field")
        return false;
      }
      if (content.trim() === "") {
        toast.error("Content is a required field")
        return false;
      }
      return true;
    }

  return (
    <div >
    <NavBar hasHiddenAuthButtons />
      <BlogPostForm handleSubmit={()=>handleUpdatePost()} isEditPost pageTitle="Edit Post" buttonText="Update Post"/>
    <Footer />
  </div>
  )
}

export default EditPost