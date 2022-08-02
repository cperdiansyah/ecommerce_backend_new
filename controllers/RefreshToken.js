import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

import Users from '../models/UserModel.js'

// const Users = require('../models/UserModel')

const refreshToken = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.refreshToken
    if (!token) return res.sendStatus(204)

    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(401)
        const user = await Users.findById(decoded.id)
        if (!user) return res.sendStatus(401)
        const accessToken = jwt.sign(
          {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN || '20s' }
        )
        res.json({ accessToken })
      }
    )
  } catch (err) {
    console.log(err)
  }
})

export default refreshToken
