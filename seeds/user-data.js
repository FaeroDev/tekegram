// [
//     {
//       "username": "Sal",
//       "password": "password12345"
//     },
//     {
//       "username": "Lernantino",
//       "password": "password12345"
//     },
//     {
//       "username": "Amiko",
//       "password": "password12345"
//     }
//   ]

const { User } = require("../models");

const loginData = [
  {
    username: "boop",
    password: "password",
    email: "boop@gmail.com",
  },
  {
      username: "test",
      password: "test",
      email: "test@gmail.com",
  },
  {
      username: "steve",
      password: "password",
      email: "steve@gmail.com",
  }
];

const userData = () => User.bulkCreate(loginData);

module.exports = userData;
