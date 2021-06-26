const factory = require('../factories')
const truncate = require('../utils/truncate')

const request = require('supertest')
const app = require('../../src/app')

describe('Authentication', () => {

  // Isso é necessário, pois, caso o teste falhe, não irá apagar os dados da base de testes
  beforeEach(async () => {
    await truncate()
  })

  it('should authenticate with valid credentials', async () => {
    
    const user = await factory.create('User', {
      password: 'User.pass.test'
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: 'User.pass.test',
      })

    expect(response.status).toBe(200);
  })

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: 'User.pass.test'
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: 'Other.pass.test',
      })
    

    expect(response.status).toBe(401);
  })

  it('should return a JWT token when authenticated', async () => {
    const user = await factory.create('User', {
      password: 'User.pass.test'
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: 'User.pass.test',
      })
    
    expect(response.body).toHaveProperty("token")
  })

  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User', {
      password: 'User.pass.test'
    })

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`)
    
    expect(response.status).toBe(200)
  })
  
  it('should not be able to access private routes without JWT token', async () => {
    const response = await request(app)
      .get('/dashboard')
    
    expect(response.status).toBe(401)
  })

  it('should not be able to access private routes with an invalid JWT token', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer 123123`)
    
    expect(response.status).toBe(401)
  })  
})

