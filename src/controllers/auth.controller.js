const login = async (req, res) => {
  res.status(200).json({ message: 'oke' })
}

const authMiddleware = { login }

export default authMiddleware
