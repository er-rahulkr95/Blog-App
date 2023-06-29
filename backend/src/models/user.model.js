const mongoose = require("mongoose");
// NOTE - "validator" external library and not the custom middleware at src/middlewares/validate.js
const validator = require("validator");
const config = require("../config/config");

//  A Mongoose schema for "users" collection
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type:String,
      required:true,
      trim: true,
      unique: true,
      lowercase:true,
      validate:(value)=>validator.isEmail(value),
    },
    password: {
      type: String,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      required:true, 
      trim: true,
      minLength:8
    },
    role: {
      type:String,
      default: 'user'
    },
  },
  // Create createdAt and updatedAt fields automatically
  {
    timestamps: true,
  }
);

// Implement the isEmailTaken() static method
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email) {
    const emailSearch = await this.findOne({email:email});
    if(emailSearch.length){
      return true
    }else{
      return false
    }
};




/*
 * Create a Mongoose model out of userSchema and export the model as "User"
 */
/**
 * @typedef User
 */

const User = mongoose.model("users", userSchema);

module.exports = {User};