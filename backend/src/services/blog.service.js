const Blog = require('../models/Blog');
const Category = require('../models/Category');
const ApiError = require('../utils/ApiError');

/**
 * @desc Get all blogs with pagination and filtering
 */
const getAllBlogs = async (query) => {
    const { page = 1, limit = 10, category } = query;
    const skip = (page - 1) * limit;

    const filter = {};
    if (category) {
        const categoryDoc = await Category.findOne({ name: { $regex: category, $options: 'i' } });
        if (categoryDoc) {
            filter.category = categoryDoc._id;
        } else {
            // If category requested but not found, return empty results early or search for nothing
            return { blogs: [], pagination: { total: 0, page, limit, totalPages: 0 } };
        }
    }

    const total = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
        .populate('author', 'name email')
        .populate('category', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    return {
        blogs,
        pagination: {
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit)
        }
    };
};

/**
 * @desc Get single blog by ID
 */
const getBlogById = async (id) => {
    const blog = await Blog.findById(id)
        .populate('author', 'name email')
        .populate('category', 'name');
    
    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }
    return blog;
};

/**
 * @desc Create a new blog
 */
const createBlog = async (blogData, authorId) => {
    const blog = await Blog.create({
        ...blogData,
        author: authorId
    });
    return blog.populate(['author', 'category']);
};

/**
 * @desc Update a blog
 */
const updateBlog = async (id, updateData, authorId) => {
    const blog = await Blog.findById(id);
    if (!blog) throw new ApiError(404, "Blog not found");

    if (blog.author.toString() !== authorId.toString()) {
        throw new ApiError(403, "You are not authorized to update this blog");
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
    ).populate(['author', 'category']);

    return updatedBlog;
};

/**
 * @desc Delete a blog
 */
const deleteBlog = async (id, authorId) => {
    const blog = await Blog.findById(id);
    if (!blog) throw new ApiError(404, "Blog not found");

    if (blog.author.toString() !== authorId.toString()) {
        throw new ApiError(403, "You are not authorized to delete this blog");
    }

    await Blog.findByIdAndDelete(id);
    return true;
};

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};
