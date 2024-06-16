const APIError = require("../../utils/APIError");

module.exports = (req, res, next) => next(new APIError(404, "URL_NOT_FOUND"));
