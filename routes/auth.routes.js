const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()


// /api/auth/users
/*
router.post('/users', async (req, res) => {
  try {
    if ( req.body ) {
      const { token } = req.body
      const user = await User.findOne({ token })
      if ( !user ) {
        res.status(400).json({ message: "Пользователь не найден" })
      }
    }
    res.status(201).json({ message: 'Пользователь данные', user })
  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' })
  }
})
*/


// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('username', 'Минимальная длина имени - 3 символа').isLength({ min: 3 }),
    check('password', 'Минимальная длина пароля - 6 символов').isLength({ min: 6 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Некорректные данные при регистрации"
      })
    }

    const { email, username, password } = req.body
    const candidate = await User.findOne({ email })

    if (candidate) {
      res.status(400).json({ message: "Такой пользователь уже зарегистрирован" })
    }

    const hashedPass = await bcrypt.hash(password, 12)
    const user = new User({ email, username, password: hashedPass })
    await user.save()
    res.status(201).json({ message: "Пользователь был успешно зарегистрирован" })

  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' })
  }
})


// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Некорректные данные при авторизации"
      })
    }

    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Неверный пароль" })
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )

    res.status(201).json({ message: 'Пользователь авторизован', token, userId: user.id, email: user.email, name: user.username })

  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' })
  }
})

module.exports = router