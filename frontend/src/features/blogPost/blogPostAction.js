import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config.json";
import { toast } from "react-toastify";
import errorHandler from "../../utils/errorHandling";
const token = localStorage.getItem("token")

export const postSubmit = createAsyncThunk(
  "postSubmit",
  async (postData, { rejectWithValue }) => {
    try {
      const { data } = await toast.promise( axios.post(
        `${config.apiEndpoint}/post/new`,
        postData,
        {headers: {
          'Authorization': `Bearer ${token}`
        } }
      ),  {
        pending: 'Uploading Data',
        success: 'Posted Blog  Successfully!',
      });
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
     const uploadData = { title: postData.title,
                          content: postData.content,
                          postedBy: postData.postedBy,}

     if(!postData.image.includes("cloudinary")){
          uploadData.image = postData.image
     }
      const response = await toast.promise( axios.patch(
        `${config.apiEndpoint}/post/id/${postData.id}`,uploadData,
        {headers: {
            'Authorization': `Bearer ${token}`
          } }
      ), {
        pending: 'Uploading Data',
        success: 'Data Updated Successfully!',
      });
     
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
        `${config.apiEndpoint}/post/id/${postId}`)
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
      const { data } = await axios.get(`${config.apiEndpoint}/post/all`);
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
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${config.apiEndpoint}/post/${id}/like`,
        { userId },
        { headers: {
            'Authorization': `Bearer ${token}`
          } }
      );
      return data;
    } catch (error) {
      const errorResponse = errorHandler(error);
      toast.error(errorResponse);
      return rejectWithValue(error);
    }
  }
);

export const removeLike = createAsyncThunk(
  "removeLike",
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${config.apiEndpoint}/post/${id}/disLike`,
        { userId },
        { headers: {
            'Authorization': `Bearer ${token}`
          }}
      );
      return data;
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
        `${config.apiEndpoint}/post/user/${userId}`,
        {headers: {
            'Authorization': `Bearer ${token}`
          } }
      );

      return data;
    } catch (error) {
      const errorResponse = errorHandler(error);
      toast.error(errorResponse);
      return rejectWithValue(error);
    }
  }
);

export const addComments = createAsyncThunk(
  "addComments",
  async ({ id, postedBy, commentText }, { rejectWithValue }) => {
    try {
      const { data } = await toast.promise( axios.put(
        `${config.apiEndpoint}/post/${id}/comment`,
        { postedBy, commentText },
        { headers: {
            'Authorization': `Bearer ${token}`
          } }
      ),{
        pending: 'Adding comment ....',
        success: 'Comment Added Successfully!',
      });
     
      return data;
    } catch (error) {
      const errorResponse = errorHandler(error);
      toast.error(errorResponse);
      return rejectWithValue(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "deletePost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const { data } = await toast.promise(axios.delete(
        `${config.apiEndpoint}/post/id/${postId}`,
        {headers: {
            'Authorization': `Bearer ${token}`
          } }
      ),{
        pending: 'Deleting Post ....',
        success: 'Post Deleted Successfully!',
      });
      return data;
    } catch (error) {
      const errorResponse = errorHandler(error);
      toast.error(errorResponse);
      return rejectWithValue(error);
    }
  }
);
