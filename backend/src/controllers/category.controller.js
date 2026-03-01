const categoryService = require('../services/category.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const getCategories = asyncHandler(async (req, res) => {
    const categories = await categoryService.getAllCategories();
    return res.status(200).json(
        new ApiResponse(200, categories, "Categories fetched successfully")
    );
});

const createCategory = asyncHandler(async (req, res) => {
    const category = await categoryService.createCategory(req.body);
    return res.status(201).json(
        new ApiResponse(201, category, "Category created successfully")
    );
});

module.exports = {
    getCategories,
    createCategory
};
