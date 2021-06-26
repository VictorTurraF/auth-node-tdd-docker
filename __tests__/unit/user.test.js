const { User } = require('../../src/app/models')
const bcrypt = require('bcryptjs')
const truncate = require('../utils/truncate')

describe('User', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should encrypt user password', async () => {
    const user = await User.create({
      name: 'Victor Turra',
      email: 'victor.florencio@univem.edu.br',
      password: 'Victor.pass.test'
    })

    const isTheSamePassword = await bcrypt.compare('Victor.pass.test', user.password_hash)
    
    expect(isTheSamePassword).toBe(true)
  })
  
})
