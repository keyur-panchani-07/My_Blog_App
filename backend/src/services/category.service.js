const Category = require('../models/Category');
const ApiError = require('../utils/ApiError');

const getAllCategories = async () => {
    return await Category.find().sort({ name: 1 });
};

const createCategory = async (categoryData) => {
    const existing = await Category.findOne({ name: categoryData.name });
    if (existing) throw new ApiError(400, "Category already exists");
    
    return await Category.create(categoryData);
};

module.exports = {
    getAllCategories,
    createCategory
};
