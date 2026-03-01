const Post = require('../models/Post');
const User = require('../models/User');

const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  const baseUrl = process.env.SERVER_PUBLIC_URL || 'http://localhost:5000';
  return `${baseUrl.replace(/\/$/, '')}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    let imagePath = null;
    if (req.file) {
      const baseUrl = process.env.SERVER_PUBLIC_URL || '';
      imagePath = `${baseUrl.replace(/\/$/, '')}/uploads/${req.file.filename}`;
    }

    const post = await Post.create({
      title,
      content,
      author: userId,
      image: imagePath
    });

    const populatedPost = await post.populate('author', 'name email');
    const postObj = populatedPost.toObject();
    postObj.image = getFullImageUrl(postObj.image);

    return res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: postObj
    });
  } catch (error) {
    console.error('Create post error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while creating post'
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '10', 10);
    const authorName = req.query.author || '';

    const skip = (page - 1) * limit;

    let filter = {};

    if (authorName) {
      const matchingAuthors = await User.find({
        name: { $regex: authorName, $options: 'i' }
      }).select('_id');

      const authorIds = matchingAuthors.map((u) => u._id);

      filter = { author: { $in: authorIds } };
    }

    const totalPosts = await Post.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / limit) || 1;

    const posts = await Post.find(filter)
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const postsWithFullImage = posts.map(post => {
      const p = post.toObject();
      p.image = getFullImageUrl(p.image);
      return p;
    });

    return res.status(200).json({
      success: true,
      message: 'Posts fetched successfully',
      data: {
        posts: postsWithFullImage,
        pagination: {
          totalPosts,
          totalPages,
          currentPage: page,
          limit
        }
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching posts'
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId).populate('author', 'name email');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const postObj = post.toObject();
    postObj.image = getFullImageUrl(postObj.image);

    return res.status(200).json({
      success: true,
      message: 'Post fetched successfully',
      data: postObj
    });
  } catch (error) {
    console.error('Get post by ID error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching post'
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const { title, content } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    if (post.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this post'
      });
    }

    if (title) post.title = title;
    if (content) post.content = content;

    if (req.file) {
      const baseUrl = process.env.SERVER_PUBLIC_URL || '';
      post.image = `${baseUrl.replace(/\/$/, '')}/uploads/${req.file.filename}`;
    }

    const updatedPost = await post.save();
    const populatedPost = await updatedPost.populate('author', 'name email');
    const postObj = populatedPost.toObject();
    postObj.image = getFullImageUrl(postObj.image);

    return res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: postObj
    });
  } catch (error) {
    console.error('Update post error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating post'
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    if (post.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this post'
      });
    }

    await post.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting post'
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
};

