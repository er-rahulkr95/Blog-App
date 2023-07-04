import { Box } from '@mui/material'
import React from 'react'
import { modules } from '../../../config/reactQuillModule'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch,useSelector} from "react-redux";
import { postContent } from '../../../features/blogPost/blogPostSlice';

const PostContent = () => {
  
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.blog);
  return (
    <Box>
    <ReactQuill
        theme="snow"
        placeholder={'Write the post content...'}
        modules={modules}
        value={content}
        onChange={(html)=>dispatch(postContent(html))}
    />

</Box>
  )
}

export default PostContent