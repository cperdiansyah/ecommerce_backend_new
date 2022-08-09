import express from 'express'
import { Login, Logout, RefreshToken, Register } from '../controllers/Auth.js'

const router = express.Router()

router.post('/login', Login)
router.post('/logout', Logout)

router.post('/register', Register)

router.get('/refreshToken', RefreshToken)

router.get('/checkToken', function (req, res) {
  return res
    .cookie('refreshToken', req.cookies.refreshToken, {
      expires: new Date(
        Date.now() +
          eval(process.env.JWT_COOKIE_EXPIRES_IN_MS || 7 * 24 * 60 * 60) * 1000
      ),
      httpOnly: true,
    })
    .json(req.cookies)
})

export default router
