// TODO: Define the query and mutation functionality to work with the Mongoose models

// **Hint**: Use the functionality in the `user-controller.js` as a guide.



// import models
const { User } = require('../models');
//import sign token
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async () => {

    },

  },
  Mutation: {
    createUser: async () => {

    },
    login: async () => {

    },
    saveBook: async () => {

    },
    deleteBook: async () => {

    },
  },
};

module.exports = resolvers;