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
    .withMessage('Id không hợp lệ')
]

const updateOrderValidator = [
  body('actionType')
    .notEmpty()
    .withMessage('ActionType không được rỗng')
    .bail()
    .isIn([0, 1])
    .withMessage('ActionType không hợp lệ'),
  body('amount').optional().isNumeric().withMessage('Số lượng sản phẩm không hợp lệ'),
  body('productId').optional().isString().withMessage('Id của sản phẩm không hợp lệ'),
  body('orderId')
    .notEmpty()
    .withMessage('Id của giỏ hàng không được rỗng')
    .bail()
    .isString()
    .withMessage('Id của giỏ hàng không hợp lệ')
]

export { createOrderValidator, getOrderValidator, updateOrderValidator }
