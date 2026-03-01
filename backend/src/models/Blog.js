const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true
        },
        content: {
            type: String,
            required: [true, 'Content is required']
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        image: {
            type: String,
            default: null
        }
    },
    { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
