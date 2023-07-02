import { configureStore } from "@reduxjs/toolkit";
import userAuthenticate from "../features/userAuthentication/userAuthenticateSlice";

export const store = configureStore({
    reducer: {
      app: userAuthenticate,
    },
  });