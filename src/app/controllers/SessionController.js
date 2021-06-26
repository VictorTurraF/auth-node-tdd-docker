const { response } = require("express");
const { User } = require('../models')

class SessionController {
  async store (req, res) {

    const { email, password } = req.body;

    console.log(email, password)

    const user = await User.findOne({ where: { email }})

    console.log(user)

    if(!user) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' })
    }
    
    if(!(await user.isPasswordValid(password))) {
      return res.status(401).json({ message: 'Senha inválida' })
    }

    return res.send({ 
      user,
      token: user.generateToken()
    });
  }
}

module.exports = new SessionController();