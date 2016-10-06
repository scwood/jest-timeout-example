import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import config from '../src/config';

import app from '../src';
import mockgoose from 'mockgoose';
import mongoose from 'mongoose';

beforeAll(done => {
  mockgoose(mongoose).then(() => {
    mongoose.connect('mongodb://localhost/test', error => {
      done(error);
    });
  });
});

afterAll(() => {
  mongoose.disconnect();
});

afterEach(done => {
  mongoose.unmockAndReconnect(done);
});

const testUser = { email: 'someuser@somemail.com', password: 'somepassword' }

it('should 200 with correct credentials', () => {
  return supertest(app)
    .post('/api/users')
    .send({ token: jwt.sign(testUser, config.secret) })
    .then(() => {
      return supertest(app)
        .post('/api/auth/tokens')
        .send(testUser)
        .expect(200);
    });
});
