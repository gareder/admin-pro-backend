require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Create the express server
const app = express();

// CORS config
app.use(cors());

// Middlewares
app.use(express.json());

//DB
dbConnection();

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));



app.listen(process.env.PORT, () => {
  console.log('Server on ' + process.env.PORT);
});