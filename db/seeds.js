const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const rp         = require('request-promise');

const { db, env }  = require('../config/environment');
const User         = require('../models/user');

mongoose.connect(db[env], { useMongoClient: true });

User.collection.drop();

function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

rp('https://randomuser.me/api/?results=10&nat=gb')
  .then(data => {
    const { results } = JSON.parse(data);

    results.forEach(result => {
      const user = new User({
        username: capitalize(result.name.first),
        name: {
          first: capitalize(result.name.first),
          last: capitalize(result.name.last)
        },
        image: result.picture.large,
        email: `${result.name.first}@${result.name.first}.com`,
        password: 'password',
        passwordConfirmation: 'password'
      });

      User.create(user);

      console.log(`${user.name.first} was created`);
    })
  })
  .catch(err => console.log(err));
