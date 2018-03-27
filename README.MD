<img width="1048" alt="screen shot 2018-03-27 at 19 16 13" src="https://user-images.githubusercontent.com/11501555/37986442-5c782a2e-31f3-11e8-886c-8f908d7cc1de.png">

# Poliglot

> #### [Visit website here](https://poliglot-app.herokuapp.com/)
> I'm using a free host on Heroku meaning it may take a couple of minutes to load initially.

Poliglot is a `MERN` stack application which allows users to instant message eachother in any language!

It's able to translate messages in a chat to whatever language the user selects when creating an account. Meaning that one person can be writing English and the other writing French and both will be able to have a conversation with no hassle.

<img width="1200" alt="screen shot 2018-03-27 at 18 22 34" src="https://user-images.githubusercontent.com/11501555/37983752-35c2b0fe-31ec-11e8-83a5-f4e7f9c2798b.png">

I built this app in my spare time to get more familiar with React.js and API unit testing with Mocha and Chai.

### Overview

The app uses Node, Express, Mongodb and Mongoose to build an API to handle the data for users, chats and messages. This is paired with a React front-end to consume this API. I am using the [Random User Generator API](https://randomuser.me/) to seed users into the database, so there should always be someone to chat to!

I use a library called [socket.io](https://socket.io) which enables real-time communication meaning that users will recieve their incoming messages instantantly.
Before this message is displayed to the user, the text will be sent through the google translate api converting it into whatever lanage the reciever has specified, Which will be saved to the API.

There is functionality to handle authentication, hashing passwords with [bcrypt](https://www.npmjs.com/package/bcrypt) and [JSON web tokens](https://jwt.io/) for passing current user data to the front-end in a secure way and restricting access to certain pages. And image uploading for profile picutres with [Filestack](https://www.filestack.com/).

I also use a variety of other packages as seen in the `package.json`.

The app is fully responsive to browsers and most phones however, I do indend on making a native version using [React Native](https://facebook.github.io/react-native/) when I have time.

### Testing

There are 56 unit tests covering majority of the API functionality. I'm using [Istanbul](https://istanbul.js.org/) for test coverage.

<img width="1048" alt="screen shot 2018-03-27 at 18 49 38" src="https://user-images.githubusercontent.com/11501555/37985020-a9f14406-31ef-11e8-9237-bcacb36064e3.png">

### Screenshots

<img width="1200" alt="screen shot 2018-03-27 at 19 07 36" src="https://user-images.githubusercontent.com/11501555/37985969-246e0aaa-31f2-11e8-81e9-70ecce32d41d.png">

<img width="1200" alt="screen shot 2018-03-27 at 19 06 58" src="https://user-images.githubusercontent.com/11501555/37985948-10b183b6-31f2-11e8-9030-ae4a95413cb6.png">

### Instructions

For those intrested in forking this repo.

```
// install dependencies
yarn install

// start API server
yarn start:server

// start client server
yarn start:client

// ensure mongodb is running
mongod

// run tests
yarn test
```

All other command scripts can be seen in the `package.json`.

### Future

There are still a bunch of features that I would like to add whenever I get some time.

- Add ability to delete a chat.
- Notify user when they recieve a new message.
- Show badge next to chat with how many unread messages they have
- Ability to alter the language of the entire app to meet the current user's preference.