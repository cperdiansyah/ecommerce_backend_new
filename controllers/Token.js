import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Users from '../models/UserModel.js'

export const refreshToken = asyncHandler(async (req, res) => {
  try {
    const { refreshToken } = req.cookies

    if (!refreshToken) return res.sendStatus(204)

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(401)
        const user = await Users.findById(decoded.id)
        if (!user) return res.sendStatus(401)
        const userData = {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        }
        const accessToken = jwt.sign(userData, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN || '20s',
        })
        console.log(process.env.JWT_EXPIRES_IN)
        const refreshToken = jwt.sign(
          userData,
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: process.env.JWT_COOKIE_EXPIRES_IN || '7d',
          }
        )

        return res
          .cookie('refreshToken', refreshToken, {
            expires: new Date(
              Date.now() +
                eval(process.env.JWT_COOKIE_EXPIRES_IN_MS || 7 * 24 * 60 * 60) *
                  1000
            ),
            httpOnly: true,
          })
          .json({
            name: user.name,
            accessToken,
          })
      }
    )
  } catch (err) {
    return console.log(err)
  }
})

export const checkToken = asyncHandler(async (req, res) => {
  /*   return res
    .cookie('refreshToken', req.cookies.refreshToken, {
      expires: new Date(
        Date.now() +
          eval(process.env.JWT_COOKIE_EXPIRES_IN_MS || 7 * 24 * 60 * 60) * 1000
      ),
      httpOnly: true,
    })
    .json(req.cookies) */
  return res.json(req.cookies)
})
