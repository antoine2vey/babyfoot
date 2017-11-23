const mongoose = require('mongoose');
const url =
  process.env.NODE_ENV === 'production'
    ? `mongodb://${process.env.MLAB_USER}:${
        process.env.MLAB_PWD
      }@ds117956.mlab.com:17956/babyfoot`
    : 'mongodb://localhost:27017/babyfoot';
mongoose.Promise = Promise;

const database = () => {
  mongoose.connect(url, { useMongoClient: true });
};

module.exports = { database };
