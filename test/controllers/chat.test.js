/* globals api, expect, describe, beforeEach, afterEach, it */
require('../spec_helper');

const User = require('../../models/user');
const Chat = require('../../models/chat');

describe('Chat Controller', () => {
  beforeEach(done => {
    User.collection.remove();
    Chat.collection.remove();
    done();
  });

  afterEach(done => {
    User.collection.remove();
    Chat.collection.remove();
    done();
  });

  describe('GET /api/chats', () => {
    let token = null;

    beforeEach(done => {
      User
        .create([
          {
            first: 'test1',
            last: 'test1',
            image: 'http://www.fillmurray.com/300/300',
            email: 'test1@test1.com',
            password: 'password',
            passwordConfirmation: 'password'
          }, 
          {
            first: 'test2',
            last: 'test2',
            image: 'http://www.fillmurray.com/300/300',
            email: 'test2@test2.com',
            password: 'password',
            passwordConfirmation: 'password'
          }
        ])
        .then(users => Chat.create({ participants: [ users[0].id, users[1].id] }))
        .then(() => {
          api
            .post('/api/login')
            .set('Accept', 'application/json')
            .send({
              email: 'test1@test1.com',
              password: 'password'
            })
            .end((err, res) => {
              token = res.body.token;
              done();
            });
        })
    });

    it('should return a 200 response', done => {
      api
        .get('/api/chats')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, done);
    });

    it('should return an array', done => {
      api
        .get('/api/chats')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should return an array of current user chats', done => {
      api
        .get('/api/chats')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body)
            .to.be.an('array')
            .and.have.property(0)
            .and.have.all.keys([
              'id',
              'messages',
              'participants',
              'language',
              'createdAt',
              'updatedAt'
            ]);
          done();
        });
    });

    it('should return chat having two participants', done => {
      api
        .get('/api/chats')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body[0].participants.length).to.eq(2);
          done();
        });
    });
  });

  describe('GET /api/chats/:id', () => {
    let token = null;
    let testChat = null;

    beforeEach(done => {
      User
        .create([
          {
            first: 'test1',
            last: 'test1',
            image: 'http://www.fillmurray.com/300/300',
            email: 'test1@test1.com',
            password: 'password',
            passwordConfirmation: 'password'
          }, 
          {
            first: 'test2',
            last: 'test2',
            image: 'http://www.fillmurray.com/300/300',
            email: 'test2@test2.com',
            password: 'password',
            passwordConfirmation: 'password'
          }
        ])
        .then(users => Chat.create({ participants: [ users[0].id, users[1].id] }))
        .then(chat => {
          testChat = chat;

          api
            .post('/api/login')
            .set('Accept', 'application/json')
            .send({
              email: 'test1@test1.com',
              password: 'password'
            })
            .end((err, res) => {
              token = res.body.token;
              done();
            });
        });
    });


    it('should return a 200 response', done => {
      api
        .get(`/api/chats/${testChat.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, done);
    });

    it('should return an object', done => {
      api
      .get(`/api/chats/${testChat.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('should return a JSON object', done => {
      api
        .get(`/api/chats/${testChat.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8');
          done();
        });
    });

    it('should return an object with chat properties', done => {
      api
        .get(`/api/chats/${testChat.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body)
            .and.have.all.keys([
              'id',
              'messages',
              'participants',
              'language',
              'createdAt',
              'updatedAt'
            ]);
          done();
        });
    });

    it('should return a 500 with incorrect id param', done => {
      api
        .get(`/api/chats/testing123`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(500, done);        
    });
  });

  describe('POST /api/chats/create/:id', () => {
    let token = null;
    let testUser = null;

    beforeEach(done => {
      User
        .create([
          {
            first: 'test1',
            last: 'test1',
            image: 'http://www.fillmurray.com/300/300',
            email: 'test1@test1.com',
            password: 'password',
            passwordConfirmation: 'password'
          }, 
          {
            first: 'test2',
            last: 'test2',
            image: 'http://www.fillmurray.com/300/300',
            email: 'test2@test2.com',
            password: 'password',
            passwordConfirmation: 'password'
          }
        ])
        .then(users => {
          testUser = users[1]

          api
            .post('/api/login')
            .set('Accept', 'application/json')
            .send({
              email: 'test1@test1.com',
              password: 'password'
            })
            .end((err, res) => {
              token = res.body.token;
              done();
            });
        });
    });
    
    it('should return a 201 response', done => {
      api
      .post(`/api/chats/create/${testUser.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(201, done);
    });

    it('should return a new chat object', done => {
      api
      .post(`/api/chats/create/${testUser.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body)
          .and.have.all.keys([
            'id',
            'messages',
            'participants',
            'language',
            'createdAt',
            'updatedAt'
          ]);
        done();
      });
    });
  });

  describe('DELETE /api/chats/:id', done => {
    let token = null;
    let testChat = null;

    beforeEach(done => {
      User
        .create([
          {
            first: 'test1',
            last: 'test1',
            image: 'http://www.fillmurray.com/300/300',
            email: 'test1@test1.com',
            password: 'password',
            passwordConfirmation: 'password'
          }, 
          {
            first: 'test2',
            last: 'test2',
            image: 'http://www.fillmurray.com/300/300',
            email: 'test2@test2.com',
            password: 'password',
            passwordConfirmation: 'password'
          }
        ])
        .then(users => Chat.create({ participants: [ users[0].id, users[1].id] }))
        .then(chat => {
          testChat = chat;

          api
            .post('/api/login')
            .set('Accept', 'application/json')
            .send({
              email: 'test1@test1.com',
              password: 'password'
            })
            .end((err, res) => {
              token = res.body.token;
              done();
            });
        });
    });

    it('should return a 204 status', done => {
      api
        .delete(`/api/chats/${testChat.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204, done);
    });
  });
});