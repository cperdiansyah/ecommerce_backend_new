import express from 'express'
import { refreshToken, checkToken } from '../controllers/Token.js'

const router = express.Router()

router.get('/refresh', refreshToken)
router.get('/check', checkToken)

export default router
