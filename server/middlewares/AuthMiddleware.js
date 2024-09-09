const { verify } = require('jsonwebtoken')
const { User } = require('../models')

const auth = async (req, res, next) => {
  const accessToken = req.cookies['access-token']

  if (!accessToken) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const validToken = verify(accessToken, 'd4592ef93578e97d027b3115dfb8f3127ba8bdd87b0c3aec0de57e2b80847b93')
    if (validToken) {
      // Check issuance time (iat)
      const issuedAt = validToken.iat * 1000 // Convert seconds to milliseconds
      const now = Date.now()
      const maxAge = 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
      if (now - issuedAt > maxAge)
        throw new Error('Token issued too long ago')
      else {
        const user = await User.findByPk(validToken.id, { attributes: { exclude: ['password'] } })
        if (user === null)
          throw new Error('Invalid user')
        else {
          req.user = user
          return next()
        }
      }
    }
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

module.exports = auth