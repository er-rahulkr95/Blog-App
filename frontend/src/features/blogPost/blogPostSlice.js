import { createSlice} from "@reduxjs/toolkit";
import { addLike, allPost, fetchPost, postSubmit, postUpdate, removeLike, userDashBoardBlogs } from "./blogPostAction";



export const blogPost = createSlice({
    name:"blogPost",
    initialState:{
        title:"",
        content:"",
        image:"",
        loading:false,
        allBlog:[],
        like:0,
        commentText:"",
        postContent:{},
        userBlog:[]
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
        postComment:(state,action)=>{
            state.commentText = action.payload;
        }
     
      },
      extraReducers:{
        [postSubmit.pending]:(state)=>{
            state.loading = true;
          
        },
        [postSubmit.fulfilled]:(state)=>{
            state.loading = false;
            state.title ="";
            state.content="";
            state.image="";
        },
        [postSubmit.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
           
        },
        [postUpdate.pending]:(state)=>{
            state.loading = true;
          
        },
        [postUpdate.fulfilled]:(state)=>{
            state.loading = false;
        },
        [postUpdate.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
           
        },
        [fetchPost.pending]:(state)=>{
            state.loading = false;
          
        },
        [fetchPost.fulfilled]:(state,action)=>{
            if(action.payload){
                state.title =action.payload.title;
                state.content=action.payload.content;
                state.image = "";
                state.loading = true;
                state.postContent = {...action.payload}
            }
            
        },
        [fetchPost.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
           
        },
        [allPost.pending]:(state)=>{
            state.loading = false;
          
        },
        [allPost.fulfilled]:(state,action)=>{
            if(action.payload){
                state.loading = true;
                state.allBlog = [...action.payload];
            }
            
        },
        [allPost.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
           
        },
        [addLike.pending]:(state)=>{
            state.like =0;
          
        },
        [addLike.fulfilled]:(state,action)=>{
            state.like = 1;
            
        },
        [addLike.rejected]:(state,action)=>{
            state.like =0;
            state.error = action.payload.message;
           
        },
        [removeLike.pending]:(state)=>{
            state.like =0;
          
        },
        [removeLike.fulfilled]:(state)=>{
            state.like = 1;
            
        },
        [removeLike.rejected]:(state,action)=>{
            state.like =0;
            state.error = action.payload.message;
        },
        [userDashBoardBlogs.pending]:(state)=>{
            state.loading = false;
          
        },
        [userDashBoardBlogs.fulfilled]:(state,action)=>{
            if(action.payload){
                state.loading = true;
                state.userBlog = [...action.payload];
            }
            
        },
        [userDashBoardBlogs.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        }
    }
    
})


export default blogPost.reducer;

export const { postTitle,postContent,postImage} = blogPost.actions;