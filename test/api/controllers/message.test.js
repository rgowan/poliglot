require('../helper');

const User     = require('../../../models/user');
const Chat     = require('../../../models/chat');
const Language = require('../../../models/language');

describe('Message Controller', () => {
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
      Language
        .create([
          { name: 'English', code: 'en', emoji: 'uk' },
          { name: 'French'	, code: 'fr', emoji: 'fr' }
        ])
        .then(languages => {
          return User
            .create([
              {
                first: 'test1',
                last: 'test1',
                image: 'http://www.fillmurray.com/300/300',
                email: 'test1@test1.com',
                language: languages[0].id,
                password: 'password',
                passwordConfirmation: 'password'
              }, 
              {
                first: 'test2',
                last: 'test2',
                image: 'http://www.fillmurray.com/300/300',
                email: 'test2@test2.com',
                language: languages[1].id,
                password: 'password',
                passwordConfirmation: 'password'
              }
            ])
        })
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

    afterEach(done => {
      Language.collection.drop();
      User.collection.drop();
      Chat.collection.drop();
      done();
    })

    it('should return a 201 response', done => {
      api
        .post(`/api/chats/${testChat.id}/messages`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'hello'
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
            'createdBy',
            'createdAt',
            'en',
            'fr',
            'read'
          ]);
        done();
        });
    });
  });
});