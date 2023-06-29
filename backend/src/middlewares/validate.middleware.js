const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();

// check is user is authenticated
isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    // Make sure token exists
    if (!token) {
        return res
        .status(401)
        .json({ message: "You must Log In"});
    }
    try {
        // Verify token
        req.user = await AuthServiceInstance.verifyToken(token)
        next();

    } catch (error) {
        return res
        .status(401)
        .json({ message: "You must Log In", error });
    }
}



const validateSchema = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(422).json(error);
    } else {
      next();
    }
  };

  module.exports = { validateSchema, isAuthenticated };
  