const findOneUser = async (req, res, next) => {
  return res.status(200).send('Oke')
}

const userMiddleware = { findOneUser }

export default userMiddleware
