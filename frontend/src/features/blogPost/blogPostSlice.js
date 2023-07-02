import { createSlice} from "@reduxjs/toolkit";
import { postSubmit } from "./blogPostAction";



export const blogPost = createSlice({
    name:"blogPost",
    initialState:{
        title:"",
        content:"",
        image:"",
        loading:false,
    },

    reducers: {
        postTitle: (state, action) => {
          state.title = action.payload;
        },
        postContent:(state,action)=>{
            state.content = action.payload;
        },
        postImage:(state,action) =>{
            state.image = action.payload;
        },
        postFormattedContent:(state,action)=>{
            state.formatedContent = action.payload
        }
      },
      extraReducers:{
        [postSubmit.pending]:(state)=>{
            state.loading = true;
          
        },
        [postSubmit.fulfilled]:(state)=>{
            state.loading = false;
        },
        [postSubmit.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
           
        }
    }
    
})


export default blogPost.reducer;

export const { postTitle,postContent,postImage,postFormattedContent} = blogPost.actions;