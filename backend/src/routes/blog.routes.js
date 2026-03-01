const { Router } = require('express');
const blogController = require('../controllers/blog.controller');
const validate = require('../middlewares/validate.middleware');
const { createBlogSchema, updateBlogSchema } = require('../validations/blog.validation');
const verifyJWT = require('../middlewares/auth.middleware');

const upload = require('../middlewares/upload.middleware');

const router = Router();

router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);

// Protected routes
router.post('/', verifyJWT, upload.single('image'), validate(createBlogSchema), blogController.createBlog);
router.patch('/:id', verifyJWT, upload.single('image'), validate(updateBlogSchema), blogController.updateBlog);
router.delete('/:id', verifyJWT, blogController.deleteBlog);

module.exports = router;
