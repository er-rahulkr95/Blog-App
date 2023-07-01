const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    commentText: { type: String, required: true, maxlength: 500 },
    created: { type: Date, default: Date.now },
    postedBy: {
      type: ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      maxlength: 150,
    },
    content: {
      type: String,
      required: [true, "content is required"],
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
      required:true,
      immutable: true,
    },
    image: {
      url: String,
      public_id: String,
    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: { type: [commentSchema], default: [] },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = {Post};
