/* const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') */

// const Users = require('../models/UserModel')
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Users from '../models/UserModel.js'
// const Users = require('../models/UserModel')

export const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await Users.findOne({ email })
  if (!user) {
    return res.status(400).json({ msg: 'Invalid Credentials' })
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({ msg: 'Invalid Credentials' })
  }
  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  }
  const accessToken = jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '20s',
  })

  const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRES_IN || '7d',
  })

  res
    .cookie('refreshToken', refreshToken, {
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10) * 1000
      ),
      httpOnly: true,
    })
    .json({
      accessToken,
    })
})

export const Logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies
  if (!refreshToken) return res.sendStatus(204)
  res.clearCookie('refreshToken')
  return res.sendStatus(200).redirect('/')
})
