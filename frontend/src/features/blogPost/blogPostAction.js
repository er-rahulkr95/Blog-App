import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config.json";
import { toast } from "react-toastify";
import errorHandler from "../../utils/errorHandling";

export const postSubmit = createAsyncThunk(
  "postSubmit",
  async (postData, { rejectWithValue }) => {
    try {
      const userPostData = {
        title: postData.title,
        content: postData.content,
        image: postData.image,
      };
      console.log(userPostData);
      const { data } = await axios.post(
        `${config.apiEndpointPost}/new`,
        postData,
        { withCredentials: true }
      );
      toast.success("Posted Data Blog Data Successfully!");
    } catch (error) {
      const errorResponse = errorHandler(error);
      toast.error(errorResponse);
      return rejectWithValue(error);
    }
  }
);

export const postUpdate = createAsyncThunk(
  "postSubmit",
  async (postData, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${config.apiEndpointPost}/id/${postData.id}`,
        {
          title: postData.title,
          content: postData.content,
          image: postData.image,
          postedBy:postData.postedBy
        },
        { withCredentials: true }
      );
      toast.success("Updated Data Successfully!");
    } catch (error) {
      const errorResponse = errorHandler(error);
      toast.error(errorResponse);
      return rejectWithValue(error);
    }
  }
);


export const fetchPost = createAsyncThunk(
    "fetchPost",
    async (postId, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${config.apiEndpointPost}/id/${postId}`,
          { withCredentials: true }
        );
        return data;
      } catch (error) {
        const errorResponse = errorHandler(error);
        toast.error(errorResponse);
        return rejectWithValue(error);
      }
    }
  );
  
  export const allPost = createAsyncThunk(
    "allPost",
    async (post, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${config.apiEndpointPost}/all`,
          { withCredentials: true }
        );
        return data;
      } catch (error) {
        const errorResponse = errorHandler(error);
        toast.error(errorResponse);
        return rejectWithValue(error);
      }
    }
  );
  
  export const addLike = createAsyncThunk(
    "addLike",
    async ({id,userId}, { rejectWithValue }) => {
      try {
        const { data } = await axios.put(
          `${config.apiEndpointPost}/${id}/like`,{userId},
          { withCredentials: true }
        );
        
      } catch (error) {
        const errorResponse = errorHandler(error);
        toast.error(errorResponse);
        return rejectWithValue(error);
      }
    }
  );
  
  export const removeLike = createAsyncThunk(
    "removeLike",
    async ({id,userId}, { rejectWithValue }) => {
      try {
        const { data } = await axios.put(
          `${config.apiEndpointPost}/${id}/disLike`,{userId},
          { withCredentials: true }
        );
        
      } catch (error) {
        const errorResponse = errorHandler(error);
        toast.error(errorResponse);
        return rejectWithValue(error);
      }
    }
  );
  
  export const userDashBoardBlogs = createAsyncThunk(
    "userDashBoardBlogs",
    async (userId, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${config.apiEndpointPost}/user/${userId}`,
          { withCredentials: true }
        );
        
        return data;
      } catch (error) {
        const errorResponse = errorHandler(error);
        toast.error(errorResponse);
        return rejectWithValue(error);
      }
    }
  );
  