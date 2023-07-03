import React, { useState } from 'react'
import PostContent from './PostContent/PostContent';
import PostImage from './PostImage/PostImage';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { postTitle } from '../../features/blogPost/blogPostSlice';

const BlogPostForm = ({handleSubmit,isEditPost}) => {

    const dispatch = useDispatch();
    const { title } = useSelector((state) => state.blog);
  return (
  
            <Box padding={{xs:"2rem" ,md:"1.5rem 5rem"}} sx={{minHeight:"80vh"}}>
                <Typography variant='h5' sx={{ pb: 4 }}> {isEditPost ? "Edit Post" : "Create post"} </Typography>
                <Box sx={{display:"flex", flexDirection:"column", gap:"2rem"}}>
                    <TextField
                        fullWidth
                        id="title"
                        label="Post title"
                        name='title'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Post title"
                        value={title}
                        onChange={(e)=>dispatch(postTitle(e.target.value))}
                    
                    />
                    <PostContent/>
                    <PostImage />
                    <Button
                        fullWidth
                        variant="contained"
                        elevation={0}
                        sx={{ p: 1, mb: 2, borderRadius: "25px", }}
                        onClick={handleSubmit}
                    >
                       {isEditPost ? "Update Post" : " Create post"}
                    </Button>
             </Box>
        </Box>
    
  )
}

export default BlogPostForm