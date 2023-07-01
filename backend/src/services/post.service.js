const{Post}  = require("../models");
const cloudinary = require("../config/cloudinary")


class PostService {
  findWithId = async (postId) => {
    try {
      const result = await Post.findById(postId).populate('comments.postedBy','fullName').populate('postedBy','fullName');
      return result;
    } catch (error) {
      throw error;
    }
  };

  findForUser = async (userId) => {
    try {
      const result = await Post.find({ postedBy: userId }).sort({createdAt:-1}).populate('postedBy','fullName');
      return result;
    } catch (error) {
      throw error;
    }
  };

  findAll = async () => {
      try {
      const postRes = await Post.find().sort({createdAt:-1}).populate('postedBy','fullName');
      return postRes;
    } catch (error) {
      throw error;
    }
  };

  create = async (post, userId) => {
    try {
      const { postedBy, title, content, image, likes, comments } = post;

      //upload image in cloudinary
        let uploadImageResult;
        if(image){
           uploadImageResult = await cloudinary.uploader.upload(image, {
            folder: "posts",
            width: 1200,
            crop: "scale",
          });
  
          
        }

        let dataToUpload 

        if(image){
          dataToUpload = {title, content, postedBy: userId,  image:{public_id: uploadImageResult.public_id,
          url: uploadImageResult.secure_url}}
        }else{
          dataToUpload = {title, content, postedBy: userId, image:{public_id: "",
            url: ""}}
        }

      const newPost = await Post.create(dataToUpload);
      return newPost;
    } catch (error) {
      throw error;
    }
  };

  addComment = async (comment, postId) => {
    try {
      const { postedBy, commentText } = comment;
      const newComment = { postedBy, commentText };
      const result = await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { comments: newComment } },
        { new: true }
      );
      return result;
    } catch (error) {
      throw error;
    }
  };

  delete = async (postId) => {

    try {
       await this.imageDestroy(postId);
      const result = await Post.findOneAndDelete({ _id: postId });
      return result;
    } catch (error) {
      throw error;
    }
  };

  imageDestroy = async(postId) =>{
    try{
      const currentPost  = await Post.findById(postId)
      const imgId = currentPost.image.public_id;
      if(imgId){
        await cloudinary.uploader.destroy(imgId); 
      }
    }catch(error){
        throw error;
    }
  }



  update = async (postId, changes) => {
    try {
      if(changes.image!==""){
        await this.imageDestroy(postId);
        const newImage = await cloudinary.uploader.upload(changes.image, {
          folder: "posts",
          width: 1200,
          crop: "scale",
        });

        changes.image =  {
          public_id: newImage.public_id,
          url: newImage.secure_url
      }
      }
    
      const result = await Post.findOneAndUpdate({ _id: postId }, changes, {
        new: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  addLike = async(postId, userId)=>{
          try{
                const like = await Post.findByIdAndUpdate(postId,{
                  $addToSet:{likes:userId}
                });
            
                return like;
          }catch(error){
            throw error;
          }
  }

  removeLike = async(postId, userId)=>{

    try{
          const removedLike = await Post.findByIdAndUpdate(postId,{
            $pull:{likes:userId}
          });
      
          return removedLike;
    }catch(error){
      throw error;
    }
}

}

module.exports = PostService;
