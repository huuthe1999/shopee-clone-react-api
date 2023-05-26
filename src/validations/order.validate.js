import { body, query } from 'express-validator'

import { STATUS_ORDER } from '../constants/index.js'

const getOrderValidator = [
  query('status')
    .notEmpty()
    .withMessage('Vui Lòng truyền status của giỏ hàng')
    .bail()
    .isNumeric()
    .withMessage('Kiểu dữ liệu status không hợp lệ')
    .bail()
    .isIn(STATUS_ORDER)
    .withMessage(`Giá trị status phải nằm trong [${STATUS_ORDER}]`)
]

const createOrderValidator = [
  body('amount')
    .notEmpty()
    .withMessage('Số lượng sản phẩm không được rỗng')
    .bail()
    .isNumeric()
    .bail()
    .withMessage('Số lượng sản phẩm không hợp lệ')
    .isInt({ min: 1 })
    .withMessage('Số lượng sản phẩm nhỏ nhất là 1'),
  body('productId')
    .notEmpty()
    .withMessage('Id không được rỗng')
    .bail()
    .isString()
    .withMessage('Id không hợp lệ'),
  body('brief_product').notEmpty().withMessage('Tóm tắt sản phẩm được rỗng')
]

export { createOrderValidator, getOrderValidator }
