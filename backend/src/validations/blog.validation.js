const { z } = require('zod');

const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    content: z.string().min(10, 'Content must be at least 10 characters'),
    category: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID'),
  }),
});

const updateBlogSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').optional(),
    content: z.string().min(10, 'Content must be at least 10 characters').optional(),
    category: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID').optional(),
  }),
});

const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Category name must be at least 2 characters'),
    description: z.string().optional(),
  }),
});

module.exports = {
  createBlogSchema,
  updateBlogSchema,
  createCategorySchema,
};
