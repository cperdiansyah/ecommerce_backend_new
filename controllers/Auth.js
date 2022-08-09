import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Users from '../models/UserModel.js'

export const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await Users.findOne({ email })
  if (!user) {
    return res.status(400).json({ massage: 'Invalid Credentials' })
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({ massage: 'Invalid Credentials' })
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

  res.cookie('refreshToken', refreshToken, {
    expires: new Date(
      Date.now() +
        eval(process.env.JWT_COOKIE_EXPIRES_IN_MS || 7 * 24 * 60 * 60) * 1000
    ),
    httpOnly: true,
  })

  return res
    .cookie('refreshToken', refreshToken, {
      expires: new Date(
        Date.now() +
          eval(process.env.JWT_COOKIE_EXPIRES_IN_MS || 7 * 24 * 60 * 60) * 1000
      ),
      httpOnly: true,
    })
    .json({
      name: user.name,
      accessToken,
    })
})

export const RefreshToken = asyncHandler(async (req, res) => {
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

export const Logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies
  if (!refreshToken) return res.sendStatus(204)
  res.clearCookie('refreshToken')
  // return res.json(req.cookies)
  return res.sendStatus(200).redirect('/')
})

export const Register = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await Users.findOne({ email })

    if (user) {
      return res.status(400).json({
        massage: 'User already exists',
      })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await Users.create({ name, email, password: hashPassword })

    const userData = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: false,
    }

    const accessToken = jwt.sign(userData, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '20s',
    })

    const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.JWT_COOKIE_EXPIRES_IN || '7d',
    })

    res.cookie('refreshToken', refreshToken, {
      expires: new Date(
        Date.now() +
          eval(process.env.JWT_COOKIE_EXPIRES_IN_MS || 7 * 24 * 60 * 60) * 1000
      ),
      httpOnly: true,
    })

    return res.status(201).json({
      name: newUser.name,
      accessToken,
    })
  } catch (err) {
    console.log(err)
  }
})
