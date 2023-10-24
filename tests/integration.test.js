const express = require('express');
const request = require('supertest');
const URL = 'http://localhost:3000';
const bodyParser = require("body-parser");

describe('testing-guest-routes', () => {
  //test user is already created and has credentials  email: "johndoe@yahoo.com", password:"0000"
  let token;
  test('POST /login - success', async () => {
    const credentials = { email: 'johndoe@yahoo.com', password: '0000' };
    const { body } = await request(URL).post('/login').send(credentials);
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('token');
    token = body.data.token;
  });
  test('GET /previous/add - success', async () => {
    await request(URL)
      .get('/add/1/2')
      .set('Authorization', 'Bearer ' + token);
    const { body } = await request(URL)
      .get('/previous/add/1')
      .set('Authorization', 'Bearer ' + token);
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('previousValue');
    expect(body.data).toHaveProperty('result');
    expect(parseInt(body.data.result)).toBe(parseInt(body.data.previousValue) + 1);
  });
});