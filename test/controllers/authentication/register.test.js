/* globals api, expect, describe, beforeEach, afterEach, it */
require('../../spec_helper');

const User = require('../../../models/user');

describe('Register routes', () => {
  beforeEach(done => {
    User.collection.remove();
    done();
  });

  afterEach(done => {
    User.collection.remove();
    done();
  });

  describe('POST /api/register', () => {
    it('should register a user providing the correct credentials', done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'test',
          name: {
            first: 'test',
            last: 'test'
          },
          image: 'http://www.fillmurray.com/300/300',
          email: 'test@test.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Welcome');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
  });
});