// TODO: Define the query and mutation functionality to work with the Mongoose models

// **Hint**: Use the functionality in the `user-controller.js` as a guide.

// import models
const { User, Book } = require('../models');
//import sign token
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({_id: context.user._id })
      }
    }
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookInput }, context) => {
      if (context.user) {
        const book = await Book.create({
          bookInput
        })
        await User.findOneAndUpdate(
          {_id: context.user._id},
          {$addToSet: { savedBooks: book.bookId }}
        );
        return book;
      }
      throw AuthenticationError;
      ('You need to be logged in');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const book = await Book.findOneAndDelete({ bookId: bookId })
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: book.bookId }}
        );
        return book;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;