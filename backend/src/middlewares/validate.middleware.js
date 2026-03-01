const ApiError = require('../utils/ApiError');

/**
 * @desc Middleware to validate request against Zod schemas
 */
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    const errorMessage = error.errors
      .map((details) => details.message)
      .join(', ');
    throw new ApiError(400, errorMessage);
  }
};

module.exports = validate;
