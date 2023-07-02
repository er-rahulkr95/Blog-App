import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config.json";
import { toast } from "react-toastify";
import errorHandler from "../../utils/errorHandling";

export const postSubmit = createAsyncThunk("postSubmit",async(postData,{rejectWithValue})=>{
    try{
      const userPostData = {title:postData.title, content:postData.content,
                                image:postData.image}
             console.log(userPostData)
       const {data} = await axios.post(`${config.apiEndpointPost}/new`,postData,{ withCredentials: true})
       toast.success("Posted Data Blog Data Successfully!");
    }catch(error){
        const errorResponse = errorHandler(error);
        toast.error(errorResponse);
        return rejectWithValue(error)
    }
})
