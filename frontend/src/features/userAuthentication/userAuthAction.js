import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config.json";
import { toast } from "react-toastify";
import errorHandler from "../../utils/errorHandling";

export const userSignUp = createAsyncThunk("userSignUp",async(userData,{rejectWithValue})=>{
    try{
      const userRegisrationData = {fullName:userData.fullName, userName:userData.userName,
                                email:userData.email, password:userData.password}
       const {data} = await axios.post(`${config.apiEndpoint}/signup`,userRegisrationData)
       toast.success("Registered Successfully!");
    }catch(error){
        const errorResponse = errorHandler(error);
        toast.error(errorResponse);
        return rejectWithValue(error)
    }
})

export const userLogIn = createAsyncThunk("userLogIn",async(userData,{rejectWithValue})=>{
try{
  const userLoginData = {  email:userData.email, password:userData.password}
                          
   const {data} = await axios.post(`${config.apiEndpoint}/login`,userLoginData)
   toast.success("Loged In Successfully!");
   return data
}catch(error){
    const errorResponse = errorHandler(error);
    toast.error(errorResponse);
    return rejectWithValue(error)
}
})

