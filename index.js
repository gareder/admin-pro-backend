require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const { dbConnection } = require('./database/config');

// Create the express server
const app = express();

// CORS config
app.use(cors());

// Middlewares
app.use(express.json());

//DB
dbConnection();

// Public directory
app.use(express.static('public'));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/medics', require('./routes/medics'));
app.use('/api/all', require('./routes/searches'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/uploads', require('./routes/uploads'));

//
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});



app.listen(process.env.PORT, () => {
  console.log('Server on ' + process.env.PORT);
});