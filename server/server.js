const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./models/db');
require('dotenv').config();
const userRoute = require('./routes/userRoutes');

connectDB();

const app = express();
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Amazon clone testing');
});

//       MIDDLEWARES
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(cors());

app.use('/api/users', userRoute);

const port = 3008;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
