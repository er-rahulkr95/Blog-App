import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config.json";
import { toast } from "react-toastify";
import errorHandler from "../../utils/errorHandling";

export const userSignUp = createAsyncThunk(
  "userSignUp",
  async (userData, { rejectWithValue }) => {
    try {
      const userRegisrationData = {
        fullName: userData.fullName,
        userName: userData.userName,
        email: userData.email,
        password: userData.password,
      };
      const { data } = await axios.post(
        `${config.apiEndpoint}/signup`,
        userRegisrationData,
        { withCredentials: true }
      );
      toast.success("Registered Successfully!");
    } catch (error) {
      const errorResponse = errorHandler(error);
      toast.error(errorResponse);
      return rejectWithValue(error);
    }
  }
);

export const userLogIn = createAsyncThunk(
  "userLogIn",
  async (userData, { rejectWithValue }) => {
    try {
      const userLoginData = {
        email: userData.email,
        password: userData.password,
      };

      const { data } = await axios.post(
        `${config.apiEndpoint}/login`,
        userLoginData,
        { withCredentials: true }
      );
      localStorage.setItem("token",data.jwt);
      localStorage.setItem("fullName",data.fullName);
      localStorage.setItem("userId",data.userId)
      localStorage.setItem("role",data.role)
      localStorage.setItem("isLoggedIn",data.isLoggedIn)
      toast.success("Logged In Successfully!");
      return data;
    } catch (error) {
      const errorResponse = errorHandler(error);
      toast.error(errorResponse);
      return rejectWithValue(error);
    }
  }
);

export const userLogOut = createAsyncThunk(
  "userLogOut",
  async (userData, { rejectWithValue }) => {
    try {
      await axios.get(`${config.apiEndpoint}/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("fullName");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      localStorage.removeItem("isLoggedIn");

      toast.success("Logged Out Successfully!");
    } catch (error) {
      const errorResponse = errorHandler(error);
      toast.error(errorResponse);
      return rejectWithValue(error);
    }
  }
);
