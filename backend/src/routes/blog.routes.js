const { Router } = require('express');
const blogController = require('../controllers/blog.controller');
const validate = require('../middlewares/validate.middleware');
const { createBlogSchema, updateBlogSchema } = require('../validations/blog.validation');
const verifyJWT = require('../middlewares/auth.middleware');

const router = Router();

router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);

// Protected routes
router.post('/', verifyJWT, validate(createBlogSchema), blogController.createBlog);
router.patch('/:id', verifyJWT, validate(updateBlogSchema), blogController.updateBlog);
router.delete('/:id', verifyJWT, blogController.deleteBlog);

module.exports = router;
