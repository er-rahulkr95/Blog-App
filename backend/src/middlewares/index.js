module.exports.errorHandler = require("./error.middleware").errorHandler

module.exports.isPostPresent = require("./post.middleware").isPostPresent


module.exports.checkUserExistsInDB = require("./user.middleware").checkUserExistsInDB

module.exports.validateSchema = require("./validate.middleware").validateSchema

