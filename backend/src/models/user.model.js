const mongoose = require("mongoose");
// NOTE - "validator" external library and not the custom middleware at src/middlewares/validate.js
const validator = require("validator");
const config = require("../config/config");

//  A Mongoose schema for "users" collection
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    username: {
      type: String,
      unique: true,
      required: true,
      unique:true,
      trim:true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: (value) => validator.isEmail(value),
    },
    password: {
      type: String,
      validate:{
        validator:(value) =>{
        if (!value.match(/\d/) && !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      }},
      required: true,
      trim: true,
      minLength: 8,
    },
    role: {
      type: String,
      trim:true,
      default: "user",
    },
  },
  // Create createdAt and updatedAt fields automatically
  {
    timestamps: true,
  }
);


/*
 * Create a Mongoose model out of userSchema and export the model as "User"
 */
/**
 * @typedef User
 */

const Users = mongoose.model("User", userSchema);

module.exports = {Users};
