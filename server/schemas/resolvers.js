const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
          if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                  .select('-__v -password');
                  
    
              return userData;
          }
        throw new AuthenticationError("Not logged in");
      },
    },
  
    Mutation: {
      login: async (parent, { email, password }) => {
        const user = await user.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError("No user found");
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError("Incorrect Password");
        }
  
        const token = signToken(user);
        return { token, user };
      },

      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
  
        return { token, user };
      },
  
      saveBook: async (parent, { bookData }, context) => {
        if (context.user) {
          return User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { savedBooks: { bookData } } },
            { new: true },
          );
        }
        throw new AuthenticationError("Please login ");
      },
  
      removeBook: async (parent, { book }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: book } },
            { new: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError("Please login ");
      },
    },
  };
  
  module.exports = resolvers;
