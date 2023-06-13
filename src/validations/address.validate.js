import { body } from 'express-validator'

const createAddressValidator = [
  body('name')
    .notEmpty()
    .withMessage('Tên không được rỗng')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Tên không hợp lệ')
    .bail()
    .isLength({ min: 2 })
    .withMessage('Tên phải ít nhất 2 kí tự'),
  body('phone')
    .notEmpty()
    .withMessage('Số điện thoại không được rỗng')
    .bail()
    .isString()
    .withMessage('Số điện thoại không hợp lệ')
    .bail()
    .isLength(10)
    .withMessage('Số điện thoại phải đúng 10 kí tự')
    .bail()
    .matches(/^0\d{9}$/)
    .withMessage('Số điện thoại phải bắt đầu bằng 0'),
  body('address')
    .notEmpty()
    .withMessage('Địa chỉ cụ thể không được rỗng')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Địa chỉ cụ thể không hợp lệ'),
  body('province')
    .exists({
      checkNull: true,
      checkFalsy: true
    })
    .withMessage('Tỉnh/thành phố không được rỗng')
    .bail()
    .isObject({ strict: true })
    .withMessage('Tỉnh/thành phố không hợp lệ'),
  body('district')
    .exists({
      checkNull: true,
      checkFalsy: true
    })
    .withMessage('Quận/huyện không được rỗng')
    .bail()
    .isObject({ strict: true })
    .withMessage('Quận/huyện không hợp lệ'),
  body('ward')
    .exists({
      checkNull: true,
      checkFalsy: true
    })
    .withMessage('Phường/xã không được rỗng')
    .bail()
    .isObject({ strict: true })
    .withMessage('Phường/xã không hợp lệ')
]

export { createAddressValidator }
