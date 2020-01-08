const request = require('supertest');
const nock = require('nock');
const app  = require('../server');


describe('Login user', () => {
  beforeAll(() => {
    if (!nock.isActive()) nock.activate();
  });

  afterAll(() => {
    nock.restore();
  });

  test('Retornar 200', async () => {
    const response = await request(app).post('/singin').send({
      email: 'toninosdev@gmail.com',
      senha: '12345'
    });
    expect(response.status).toEqual(200);
  });


  // test('Retornar 200', async () => {
  //   const response = await request(app).post('/singup').send({
  //     nome: 'Antonino Caetano Gama',
  //     email: 'acg@gmail.com',
  //     senha: '12345',
  //     cep:'50050-000',

  //   });
  //   expect(response.status).toEqual(200);
  // });


  // test('Retornar 200', async () => {
  //   const response = await request(app).get('/user').send({
  //     email: 'antoninocaetano@gmail.com',
  //     senha: '12345'
  //   });
  //   expect(response.status).toEqual(200);
  // });
  

});