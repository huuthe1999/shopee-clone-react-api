import myCloudinary from './config/cloudinary.config.js'

const upload = async () => {
  myCloudinary.uploader.upload(
    'https://hips.hearstapps.com/hmg-prod/images/pier-over-lake-against-sky-at-dusk-royalty-free-image-1655669424.jpg?crop=0.662xw:1.00xh;0.162xw,0&resize=980:*',
    { upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET },
    (error, result) => {
      console.log(result, error)
    }
  )
}

upload()
