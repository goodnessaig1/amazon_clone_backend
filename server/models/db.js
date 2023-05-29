const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.LOCAL_DB;
const dataBase = process.env.DATABASE;

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      mongoose
        .connect(mongoURI)
        .then(() => {
          console.log('Connected to local MongoDB');
        })
        .catch((error) => {
          console.error('Error connecting to local MongoDB:', error);
        });
    } else {
      mongoose
        .connect(dataBase)
        .then(() => {
          console.log('Connected to MongoDB Cloud');
        })
        .catch((error) => {
          console.error('Error connecting to MongoDB Cloud:', error);
        });
    }
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

module.exports = connectDB;
