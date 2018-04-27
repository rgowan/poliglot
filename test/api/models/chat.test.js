require('../spec_helper');

const Chat = require('../../../models/chat');


describe('Chat model tests', () => {
  it('should be invalid if chat does not have 2 participants', done => {
    const chat = new Chat();

    chat.validate(err => {
      expect(err.errors.participants).to.exist;
      done();
    });
  });
});