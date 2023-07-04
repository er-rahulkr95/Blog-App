import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config.json";
import { toast } from "react-toastify";
import errorHandler from "../../utils/errorHandling";

export const postSubmit = createAsyncThunk(
  "postSubmit",
  async (postData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${config.apiEndpoint}/post/new`,
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
        `${config.apiEndpoint}/post/id/${postData.id}`,
        {
          title: postData.title,
          content: postData.content,
          image: postData.image,
          postedBy: postData.postedBy,
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
        `${config.apiEndpoint}/post/id/${postId}`,
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
      const { data } = await axios.get(`${config.apiEndpoint}/post/all`, {
        withCredentials: true,
      });
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

export const removeLike = createAsyncThunk(
  "removeLike",
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${config.apiEndpoint}/post/${id}/disLike`,
        { userId },
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

export const userDashBoardBlogs = createAsyncThunk(
  "userDashBoardBlogs",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${config.apiEndpoint}/post/user/${userId}`,
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

export const addComments = createAsyncThunk(
  "addComments",
  async ({ id, postedBy, commentText }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${config.apiEndpoint}/post/${id}/comment`,
        { postedBy, commentText },
        { withCredentials: true }
      );
      toast.success("Comment Added Successfully!");
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
      const { data } = await axios.delete(
        `${config.apiEndpoint}/post/id/${postId}`,
        { withCredentials: true }
      );
      toast.success("Post Deleted Successfully!");
      return data;
    } catch (error) {
      const errorResponse = errorHandler(error);
      toast.error(errorResponse);
      return rejectWithValue(error);
    }
  }
);
