import { body } from 'express-validator'

const cateBannerValidator = [
  body('image')
    .trim()
    .notEmpty()
    .withMessage('Image không được rỗng')
    .bail()
    .isURL({ require_protocol: true })
    .withMessage('Đường dẫn không hợp lệ'),
  body('text').trim().notEmpty().withMessage('Text không được rỗng')
]

const manyCateBannerValidator = [
  body('*.image')
    .trim()
    .notEmpty()
    .withMessage('Image không được rỗng')
    .bail()
    .isURL({ require_protocol: true })
    .withMessage('Đường dẫn không hợp lệ'),
  body('*.text').trim().notEmpty().withMessage('Text không được rỗng')
]

export { cateBannerValidator, manyCateBannerValidator }
