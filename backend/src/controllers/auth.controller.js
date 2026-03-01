const authService = require('../services/auth.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc Register user
 */
const register = asyncHandler(async (req, res) => {
    const user = await authService.registerUser(req.body);
    return res.status(201).json(
        new ApiResponse(201, user, "User registered successfully")
    );
});

/**
 * @desc Login user
 */
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.loginUser(email, password);

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, { user, accessToken, refreshToken }, "User logged in successfully")
        );
});

/**
 * @desc Logout user
 */
const logout = asyncHandler(async (req, res) => {
    // Logic to clear refresh token from DB could go here
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

module.exports = {
    register,
    login,
    logout
};
