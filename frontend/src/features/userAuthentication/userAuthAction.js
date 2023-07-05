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
      const { data } = await toast.promise(axios.post(
        `${config.apiEndpoint}/auth/signup`,
        userRegisrationData,
        { withCredentials: true }
      ),{
        pending: 'Registering User ....',
        success: 'Registered Successfully!',
      });
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
        `${config.apiEndpoint}/auth/login`,
        userLoginData,
        { withCredentials: true, credentials: 'include' }
      );
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("fullName", data.fullName);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("role", data.role);
      localStorage.setItem("isLoggedIn", data.isLoggedIn);
      toast.success("Logged In Successfully!");
      return data;
    } catch (error) {
      const errorResponse = errorHandler(error);
      toast.error(errorResponse);
      return rejectWithValue(error);
    }
  }
);
