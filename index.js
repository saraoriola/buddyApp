// Import the "express" module
const express = require('express');
// Create an instance of the Express application
const app = express();
// Define the port number on which the server will run
const PORT = 3000;
// Import the 'dbConnection' function from the './config/config' file
const { dbConnection } = require('./config/config');

// Middleware to parse JSON in the request body
app.use(express.json());

// Establish the connection with the database
dbConnection();

app.use('/users', require('./routes/users'));
app.use('/doubts', require('./routes/doubts'));
app.use('/answers', require('./routes/answers'));

// Start the server on the specified port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
