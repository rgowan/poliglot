const mongoose     = require('mongoose');
mongoose.Promise   = require('bluebird');
const rp           = require('request-promise');

const { db, env }  = require('../config/environment');
const User         = require('../models/user');
const Chat         = require('../models/chat');

mongoose.connect(db[env], { useMongoClient: true });

User.collection.drop();

const globalUsers = [];

rp('https://randomuser.me/api/?results=100&nat=gb')
  .then(data => {
    const { results } = JSON.parse(data);

    results.forEach(result => {
      const user = new User({
        first: capitalize(result.name.first),
        last: capitalize(result.name.last),
        image: result.picture.large,
        email: `${result.name.first}@${result.name.last}.com`,
        password: 'password',
        passwordConfirmation: 'password'
      });

      globalUsers.push(user);
      User.create(user);
    })
  })
  .then(() => {
    return User.create({
      first: 'Rane',
      last: 'Gowan',
      image: 'https://avatars0.githubusercontent.com/u/11501555?s=460&v=4',
      email: 'rane@gowan.com',
      password: 'password',
      passwordConfirmation: 'password'
    })
  })
  .then(user => {
    globalUsers.push(user);
    console.log(`${globalUsers.length} users were created!`);
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());


function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}