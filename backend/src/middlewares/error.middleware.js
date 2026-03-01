const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    if (!statusCode) {
        statusCode = 500;
    }

    res.status(statusCode).json(
        new ApiResponse(statusCode, null, message || "Internal Server Error")
    );
};

module.exports = errorHandler;
