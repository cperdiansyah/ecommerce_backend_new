import express from 'express'
import {
  getProductFavorite,
  addProductFavorite,
} from '../controllers/Products.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

/* favorites */
router.route('/').get(protect, getProductFavorite)
router.route('/:id').post(protect, addProductFavorite)

export default router
