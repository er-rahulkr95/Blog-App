import { configureStore } from "@reduxjs/toolkit";
import userAuthenticate from "../features/userAuthentication/userAuthenticateSlice";
import  blogPost  from "../features/blogPost/blogPostSlice";


export const store = configureStore({
    reducer: {
      app: userAuthenticate,
      blog: blogPost,
    },
  });