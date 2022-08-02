import asyncHandler from 'express-async-handler'
import Products from '../models/ProductModels.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Products.find(
      {},
      {
        name: 1,
        price: 1,
        images: 1,
        rating: 1,
      }
    )
    res.status(200).json(products)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// desc Get a single product
// @route GET /api/products/:id
// @access Public
export const getProductsById = asyncHandler(async (req, res) => {
  try {
    const product = await Products.findById(req.params.id)
    if (!product) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    })
  }
})
