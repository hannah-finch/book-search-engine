// TODO: Define the query and mutation functionality to work with the Mongoose models

// **Hint**: Use the functionality in the `user-controller.js` as a guide.



// import models
const { User } = require('../models');
//import sign token
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, {_id, username}) => {
      const params = (() => {
        if (_id) {
          return({_id: _id})
        } else if (username) {
          return ({username: username})
        } else return({});
      })
      return User.findOne(params);
    },

  },
  Mutation: {
    createUser: async () => {

    },
    login: async () => {

    },
    saveBook: async () => {

    },
    removeBook: async () => {

    },
  },
};

module.exports = resolvers;