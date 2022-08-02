import asyncHandler from 'express-async-handler'
import Categories from '../models/CategoryModels.js'

// @desc Fetch all categories
// @route GET /api/categories
// @access Public
export const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Categories.find({})

  res.status(200).json(categories)
})

// desc Get a single category
// @route GET /api/category/:id
// @access Public
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Categories.findById(req.params.id)
  if (category) {
    res.status(200).json(category)
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'Category not found',
    })
  }
})

