import { body } from 'express-validator'

const productValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Tên sản phẩm không được rỗng')
    .bail()
    .isString()
    .withMessage('Kiểu dữ liệu không hợp lệ'),
  body('price')
    .trim()
    .notEmpty()
    .withMessage('Giá không được rỗng')
    .bail()
    .isNumeric()
    .withMessage('Giá không hợp lệ'),
  body('quantity')
    .trim()
    .notEmpty()
    .withMessage('Số lượng không được rỗng')
    .bail()
    .isNumeric()
    .withMessage('Số lượng không hợp lệ')
]

export { productValidator }
