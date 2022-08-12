import express from 'express'
import {
  getProducts,
  getProductsById,
  addProductCart,
  getProductCart,
  getProductFavorite,
  addProductFavorite,
} from '../controllers/Products.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProductsById)

router
  .route('/:id/cart')
  .post(protect, addProductCart)
  .get(protect, getProductCart)

router
  .route('/:id/favorites')
  .post(protect, addProductFavorite)
  .get(protect, getProductFavorite)

export default router
