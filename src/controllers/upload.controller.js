import myCloudinary from '../config/cloudinary.config.js'
import { createFailedResponse, createSuccessResponse } from '../utils/format-response.util.js'

const uploadImage = async (req, res, next) => {
  const { image } = req.body

  if (!image) {
    return res.status(400).json(createFailedResponse('Vui lòng truyền hình ảnh'))
  }

  try {
    const { secure_url, public_id } = await myCloudinary.uploader.upload(image, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET_AVATAR
    })
    return res
      .status(201)
      .json(createSuccessResponse('Tải ảnh thành công thành công', { secure_url, public_id }))
  } catch (error) {
    console.log('🚀 ~ uploadImage ~ error:', error)
    next('Tải ảnh lên bị lỗi. Vui lòng thử lại!')
  }
}

const uploadMiddleware = { uploadImage }

export default uploadMiddleware
