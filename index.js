require('dotenv').config();
const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config');

// Create the express server
const app = express();

// CORS config
app.use(cors());

//DB
dbConnection();

// Routes
app.get('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'Hello!'
  });
});

app.listen(process.env.PORT, () => {
  console.log('Server on ' + process.env.PORT);
});