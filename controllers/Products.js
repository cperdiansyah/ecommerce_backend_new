import asyncHandler from 'express-async-handler'
import Products from '../models/ProductModels.js'
import Carts from '../models/CartModel.js'
import Favorites from '../models/FavoriteModel.js'

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

// desc get carts of products
// @route GET /api/products/:id/cart
// @access Private
export const getProductCart = asyncHandler(async (req, res) => {
  try {
    const cart = await Carts.find({ user: req.user.id })
    if (!cart) {
      return res.status(404).json({ status: 'fail', message: 'Cart not found' })
    }

    return res.status(200).json({ status: 'success', data: cart })
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    })
  }
})

// desc add  products to cart
// @route POST /api/products/:id/cart
// @access Private
export const addProductCart = asyncHandler(async (req, res) => {
  try {
    let newCart
    const { id: productId } = req.params
    const product = await Products.findById(productId)

    if (!product) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Product not found' })
    }
    const cart = await Carts.findOne({ user: req.user._id, product: productId })

    if (cart) {
      newCart = await Carts.findOneAndUpdate(
        {
          user: req.user._id,
          product: productId,
        },
        {
          $set: {
            quantity: cart.quantity + req.params.quantity || cart.quantity + 1,
          },
        }
      )
    } else {
      // If product is unavailable on database
      newCart = await Carts.create({
        user: req.user._id,
        product: productId,
        quantity: req.params.quantity || 1,
      })
    }

    res.status(200).json({
      status: 'success',
      message: 'Product added to cart',
      data: {
        productId: productId,
        cartId: newCart._id,
      },
    })
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    })
  }
})
