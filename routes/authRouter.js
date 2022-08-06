import express from 'express'
import { Login, Logout, refreshToken } from '../controllers/Auth.js'

const router = express.Router()

router.post('/login', Login)
router.post('/logout', Logout)

router.get('/refreshToken', refreshToken)

export default router
