const { User } = require('../models')

class RegisterController {
  async store( req, res ) {
    const { name, email, password } = req.body

    const user = await User.create({
      name,
      email,
      password
    })

    return res.status(201).send(user)
  }
}

module.exports = new RegisterController()