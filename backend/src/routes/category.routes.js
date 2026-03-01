const { Router } = require('express');
const categoryController = require('../controllers/category.controller');
const validate = require('../middlewares/validate.middleware');
const { createCategorySchema } = require('../validations/blog.validation');
const verifyJWT = require('../middlewares/auth.middleware');

const router = Router();

router.get('/', categoryController.getCategories);
router.post('/', verifyJWT, validate(createCategorySchema), categoryController.createCategory);

module.exports = router;
