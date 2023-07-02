import { createSlice} from "@reduxjs/toolkit";
import { userSignUp, userLogIn } from "./userAuthAction";


export const userAuthenticate = createSlice({
    name:"userAuthenticate",
    initialState:{
        user:{},
        loading:false,
        error:null,
    },
    extraReducers:{
        [userSignUp.pending]:(state)=>{
            state.loading = true;
          
        },
        [userSignUp.fulfilled]:(state)=>{
            state.loading = false;
        },
        [userSignUp.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
           
        },
        [userLogIn.pending]:(state)=>{
            state.loading = true;
        },
        [userLogIn.fulfilled]:(state,action)=>{
            state.loading = false;
            state.user = {...action.payload};
           
        },
        [userLogIn.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        }
    }
})


export default userAuthenticate.reducer;