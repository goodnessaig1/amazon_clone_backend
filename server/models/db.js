const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.LOCAL_DB;
const dataBase = process.env.DATABASE;

const connectDB = async () => {
  try {
    let dbURI;

    if (process.env.NODE_ENV === 'production') {
      dbURI = dataBase;
    } else {
      dbURI = mongoURI;
    }

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
};

module.exports = connectDB;
