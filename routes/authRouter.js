import express from 'express'
import { Login, Logout, refreshToken } from '../controllers/Auth.js'

const router = express.Router()

router.post('/login', Login)
router.post('/logout', Logout)

router.get('/refreshToken', refreshToken)

router.get('/checkToken', function (req, res) {
  return res.json(req.cookies)
})

export default router
