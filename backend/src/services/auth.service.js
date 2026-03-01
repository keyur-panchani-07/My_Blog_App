const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @desc Generate Access and Refresh Tokens
 */
const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = jwt.sign(
            { _id: user._id, email: user.email, name: user.name },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d' }
        );

        const refreshToken = jwt.sign(
            { _id: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '10d' }
        );

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

/**
 * @desc Register a new user
 */
const registerUser = async (userData) => {
    const { email, password, name } = userData;

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(409, "User with email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return createdUser;
};

/**
 * @desc Login user
 */
const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return { user: loggedInUser, accessToken, refreshToken };
};

module.exports = {
    registerUser,
    loginUser,
    generateTokens
};
