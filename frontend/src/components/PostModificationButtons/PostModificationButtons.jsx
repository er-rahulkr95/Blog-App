import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../features/blogPost/blogPostAction";

const PostModificationButtons = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (postId) => {
    dispatch(deletePost({ postId }));
  };
  
  return (
    <Box
      sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
    >
      <Box>
        <Button
          variant="outlined"
          color="success"
          onClick={() => navigate(`/post/edit/${id}`)}
        >
          Edit
        </Button>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(id)}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default PostModificationButtons;
