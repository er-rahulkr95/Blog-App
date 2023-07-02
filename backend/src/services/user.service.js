const {Users} = require("../models");

class UserService {
  register = async (user) => {
    try {
      
      const { fullName, email, userName, password } = user;
      const newUser = new Users({ fullName, email, userName, password });
      const result = await newUser.save();
      return result;
    } catch (error) {
      throw error;
    }
  };

  findAll = async () => {
    const userResult = await Users.find({});
    return userResult;
  };

  findByEmail = async (email) => {
  
    try {
      const userResult = await Users.findOne({ email });
      return userResult;
    } catch (error) {
      throw error;
    }
  };

  findWithId = async (id) => {
    try {
      const result = await Users.findById(id);
      return result;
    } catch (error) {
      throw error;
    }
  };

  findProfile = async (id) => {
    try {
      const result = await Users.findById(id).select("-password");
      return result;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UserService;
