const factory = require('../factories')
const request = require('supertest')
const app = require('../../src/app')
const truncate = require('../utils/truncate')

describe('Register', () => {
  // Isso é necessário, pois, caso o teste falhe, não irá apagar os dados da base de testes
  beforeEach(async () => {
    await truncate()
  })

  it('should register an user', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        name: "User Teste",
        email: "test@mail.com",
        password: "User.pass.test"
      })

    expect(response.status).toBe(201)
  })

  it('should return an user when registering', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        name: "User Teste",
        email: "test@mail.com",
        password: "User.pass.test"
      })

    expect(response.body).toHaveProperty('name')
  })
  

  it('should be possible authenticates with created user', async () => {
    const createdUser = await request(app)
      .post('/register')
      .send({
        name: "User Teste",
        email: "test@mail.com",
        password: "User.pass.test"
      })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: "test@mail.com",
        password: "User.pass.test"
      })

    expect(response.body).toHaveProperty('token')
  })
  

})
