const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const rp = require('request-promise');

const { db, env } = require('../config/environment');
const User = require('../models/user');
const Language = require('../models/language');

mongoose.connect(db[env], { useMongoClient: true });

User.collection.drop();
Language.collection.drop();

let globalUsers = [];
let globalLanguages = [];

function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

Language.create([
  {name: 'Albanian', code: 'sq', emoji: 'albania'},
  {name: 'Italian',	code: 'it', emoji: 'it'},
  {name: 'Arabic', code: 'ar', emoji: 'saudi_arabia'},
  {name: 'Japanese', code: 'ja', emoji: 'jp'},
  {name: 'Korean', code: 'ko', emoji: 'kr'},
  {name: 'Bengali',	code: 'bn', emoji: 'bangladesh'},
  {name: 'Chinese Simplified', code: 'zh-CN', emoji: 'cn'},
  {name: 'Chinese Traditional',	code: 'zh-TW', emoji: 'cn'},
  {name: 'Croatian', code: 'hr', emoji: 'croatia'},
  {name: 'Czech',	code: 'cs', emoji: 'czech_republic'},
  {name: 'Polish', code: 'pl', emoji: 'poland'},
  {name: 'English', code: 'en', emoji: 'uk'},
  {name: 'Dutch',	code: 'nl', emoji: 'netherlands'},
  {name: 'Portuguese', code: 'pt', emoji: 'portugal'},
  {name: 'Russian', code: 'ru', emoji: 'ru'},
  {name: 'Serbian', code: 'sr', emoji: 'serbia'},
  {name: 'French'	, code: 'fr', emoji: 'fr'},
  {name: 'Spanish' , code: 'es', emoji: 'es'},
  {name: 'Swedish' , code: 'sv', emoji: 'sweden'},
  {name: 'German' , code: 'de', emoji: 'de'},
  {name: 'Greek' , code: 'el', emoji: 'greece'},
  {name: 'Turkish' , code: 'tr', emoji: 'tr'},
  {name: 'Hindi' , code: 'hi', emoji: 'india'},
  {name: 'Urdu'	, code: 'ur', emoji: 'pakistan'},
])
.then(languages => {
  console.log(`${languages.length} languages were created!`);
  globalLanguages = languages;

  return rp('https://randomuser.me/api/?results=25&nat=gb');
})
.then(data => {
  const { results } = JSON.parse(data);

  results.forEach(result => {
    const user = new User({
      first: capitalize(result.name.first),
      last: capitalize(result.name.last),
      image: result.picture.large,
      email: `${result.name.first}@${result.name.last}.com`,
      language: globalLanguages[Math.floor(Math.random()*globalLanguages.length)]._id,
      password: 'password',
      passwordConfirmation: 'password',
      online: false
    });

    globalUsers.push(user);
    return User.create(user);
  });
})
.then(() => {
  return User.create({
    first: 'Rane',
    last: 'Gowan',
    image: 'https://avatars0.githubusercontent.com/u/11501555?s=460&v=4',
    email: 'rane@gowan.com',
    language: globalLanguages.find(language => language.name === 'English')._id,
    password: 'password',
    passwordConfirmation: 'password',
    online: false
  });
})
.then(user => {
  globalUsers.push(user);
  console.log(`${globalUsers.length} users were created!`);
})
.catch(err => console.log(err))
.finally(() =>  mongoose.connection.close());