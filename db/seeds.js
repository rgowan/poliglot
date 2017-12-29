const mongoose     = require('mongoose');
mongoose.Promise   = require('bluebird');
const rp           = require('request-promise');

const { db, env }  = require('../config/environment');
const User         = require('../models/user');
const Language     = require('../models/language');

mongoose.connect(db[env], { useMongoClient: true });

User.collection.drop();
Language.collection.drop();

const globalUsers = [];

rp('https://randomuser.me/api/?results=5&nat=gb')
  .then(data => {
    const { results } = JSON.parse(data);

    results.forEach(result => {
      const user = new User({
        first: capitalize(result.name.first),
        last: capitalize(result.name.last),
        image: result.picture.large,
        email: `${result.name.first}@${result.name.last}.com`,
        password: 'password',
        passwordConfirmation: 'password',
        online: false
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
      passwordConfirmation: 'password',
      online: false
    })
  })
  .then(user => {
    globalUsers.push(user);
    console.log(`${globalUsers.length} users were created!`);

    return Language.create([
      {name: 'Albanian', code: 'sq'},
      {name: 'Italian',	code: 'it'},
      {name: 'Arabic', code: 'ar'},
      {name: 'Japanese', code: 'ja'},
      {name: 'Korean', code: 'ko'},
      {name: 'Bengali',	code: 'bn'},
      {name: 'Chinese Simplified', code: 'zh-CN'},
      {name: 'Chinese Traditional',	code: 'zh-TW'},
      {name: 'Croatian', code: 'hr'},
      {name: 'Czech',	code: 'cs'},
      {name: 'Polish', code: 'pl'},
      {name: 'Dutch',	code: 'nl'},
      {name: 'Portuguese', code: 'pt'},
      {name: 'Russian', code: 'ru'},
      {name: 'Serbian', code: 'sr'},
      {name: 'French'	, code: 'fr'},
      {name: 'Spanish' , code: 'es'},
      {name: 'Swedish' , code: 'sv'},
      {name: 'German' , code: 'de'},
      {name: 'Greek' , code: 'el'},
      {name: 'Thai'	, code: 'th'},
      {name: 'Turkish' , code: 'tr'},
      {name: 'Hindi' , code: 'hi'},
      {name: 'Urdu'	, code: 'ur'},
    ])
  })
  .then(languages => {
    console.log(`${languages.length} languages were created!`);
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());


function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}