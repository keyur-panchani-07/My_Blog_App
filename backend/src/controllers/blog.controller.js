const blogService = require('../services/blog.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc Get all blogs
 */
const getBlogs = asyncHandler(async (req, res) => {
    const result = await blogService.getAllBlogs(req.query);
    return res.status(200).json(
        new ApiResponse(200, result, "Blogs fetched successfully")
    );
});

/**
 * @desc Get blog by ID
 */
const getBlogById = asyncHandler(async (req, res) => {
    const blog = await blogService.getBlogById(req.params.id);
    return res.status(200).json(
        new ApiResponse(200, blog, "Blog fetched successfully")
    );
});

/**
 * @desc Create blog
 */
const createBlog = asyncHandler(async (req, res) => {
    const blogData = { ...req.body };
    if (req.file) {
        blogData.image = req.file.path;
    }
    const blog = await blogService.createBlog(blogData, req.user._id);
    return res.status(201).json(
        new ApiResponse(201, blog, "Blog created successfully")
    );
});

/**
 * @desc Update blog
 */
const updateBlog = asyncHandler(async (req, res) => {
    const updateData = { ...req.body };
    if (req.file) {
        updateData.image = req.file.path;
    }
    const blog = await blogService.updateBlog(req.params.id, updateData, req.user._id);
    return res.status(200).json(
        new ApiResponse(200, blog, "Blog updated successfully")
    );
});

/**
 * @desc Delete blog
 */
const deleteBlog = asyncHandler(async (req, res) => {
    await blogService.deleteBlog(req.params.id, req.user._id);
    return res.status(200).json(
        new ApiResponse(200, {}, "Blog deleted successfully")
    );
});

module.exports = {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};
