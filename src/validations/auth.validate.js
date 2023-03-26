import { check } from 'express-validator'

const authValidator = [
  check('email')
    .notEmpty()
    .withMessage('Email không được rỗng')
    .bail()
    .trim()
    .escape()
    .isEmail()
    .withMessage('Email không hợp lệ')
    .bail(),
  check('password')
    .notEmpty()
    .withMessage('Mật khẩu không được rỗng')
    .bail()
    .isLength({ min: 8, max: 160 })
    .withMessage('Mật khẩu phải từ 8-160 kí tự')
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Mật khẩu phải có ít nhất 1 ký tự viết thường, 1 ký tự viết hoa và 1 chữ số')
]

export { authValidator }
