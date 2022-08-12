import express from 'express'
import {
  getProducts,
  getProductsById,
  addProductCart,
  getProductCart,
} from '../controllers/Products.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProductsById)

router
  .route('/:id/cart')
  .post(protect, addProductCart)
  .get(protect, getProductCart)

export default router
