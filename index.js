// Import the "express" module
const express = require("express");
// Import the 'dbConnection' function from the './config/config' file
const { dbConnection } = require("./config/config");

// Create an instance of the Express application
const app = express();

// Define the port number on which the server will run
const PORT = 3000;

// Establish the connection with the database
dbConnection();

// Middleware to parse JSON in the request body
app.use(express.json());


// Start the server on the specified port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));