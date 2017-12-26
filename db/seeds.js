const mongoose     = require('mongoose');
mongoose.Promise   = require('bluebird');
const rp           = require('request-promise');

const { db, env }  = require('../config/environment');
const User         = require('../models/user');
const Chat         = require('../models/chat');

mongoose.connect(db[env], { useMongoClient: true });

Chat.collection.drop();
User.collection.drop();

const globalUsers = [];

rp('https://randomuser.me/api/?results=10&nat=gb')
  .then(data => {
    const { results } = JSON.parse(data);

    results.forEach(result => {
      const user = new User({
        name: {
          first: capitalize(result.name.first),
          last: capitalize(result.name.last)
        },
        image: result.picture.large,
        email: `${result.name.first}@${result.name.first}.com`,
        password: 'password',
        passwordConfirmation: 'password'
      });
      
      // console.log(user);
      globalUsers.push(user);
      User.create(user);
    })
  })
  .then(() => {
    console.log(`${globalUsers.length} users were created!`);

    return Chat.create([
      {
        participants: [globalUsers[0]._id, globalUsers[1]._id],
        messages: [
          {
            content: 'Hello!',
            createdBy: globalUsers[0]._id
          },
          {
            content: 'How are you?',
            createdBy: globalUsers[1]._id
          }
        ]
      },
      {
        participants: [globalUsers[2]._id, globalUsers[3]._id],
        messages: [
          {
            content: 'Hey!',
            createdBy: globalUsers[2]._id
          },
          {
            content: 'How are you?',
            createdBy: globalUsers[3]._id
          },
          {
            content: 'Good thanks!',
            createdBy: globalUsers[2]._id
          }
        ]
      }, 
    ])
  })
  .then(chats => {
    console.log(`${chats.length} chats were created!`);
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());


function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}