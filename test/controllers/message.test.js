/* globals api, expect, describe, beforeEach, afterEach, it */
require('../spec_helper');

const User = require('../../models/user');
const Chat = require('../../models/chat');

describe('Message Controller Functions', () => {
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

  describe('POST /api/chats/:id/messages', done => {
    let token    = null;
    let testChat = null;

    beforeEach(done => {
      User
        .create([
          {
            name: {
              first: 'test1',
              last: 'test1'
            },
            image: 'http://www.fillmurray.com/300/300',
            email: 'test1@test1.com',
            password: 'password',
            passwordConfirmation: 'password'
          }, 
          {
            name: {
              first: 'test2',
              last: 'test2'
            },
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

    it('should return a 201 response', done => {
      api
        .post(`/api/chats/${testChat.id}/messages`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'testing123'
        })
        .expect(201, done);
    });

    it('should return a message object', done => {
      api
        .post(`/api/chats/${testChat.id}/messages`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'testing123'
        })
        .end((err, res) => {
          expect(res.body)
          .and.have.all.keys([
            'id',
            'content',
            'createdBy',
            'createdAt',
            'updatedAt'
          ]);
        done();
        });
    })
  });

  describe('DELETE /api/chats/:chatId/messages/:messageId', done => {
    let token       = null;
    let testChat    = null;
    let testMessage = null;

    beforeEach(done => {
      User
        .create([
          {
            name: {
              first: 'test1',
              last: 'test1'
            },
            image: 'http://www.fillmurray.com/300/300',
            email: 'test1@test1.com',
            password: 'password',
            passwordConfirmation: 'password'
          }, 
          {
            name: {
              first: 'test2',
              last: 'test2'
            },
            image: 'http://www.fillmurray.com/300/300',
            email: 'test2@test2.com',
            password: 'password',
            passwordConfirmation: 'password'
          }
        ])
        .then(users => Chat.create({ participants: [ users[0].id, users[1].id],  messages: [{ content: 'testing123', createdBy: users[0] }] }))
        .then(chat => {
          testChat = chat;
          testMessage = chat.messages[0];

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
        .delete(`/api/chats/${testChat.id}/messages/${testMessage.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204, done);
    });
  });
});