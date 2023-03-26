import jwt from 'jsonwebtoken'

export const generateToken = (data, secretKey, tokenLife) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      data,
      secretKey,
      {
        expiresIn: tokenLife
      },
      (err, decoded) => {
        if (err) return reject(err)
        resolve(decoded)
      }
    )
  })
}

export const verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) return reject(err)
      resolve(decoded)
    })
  })
}
