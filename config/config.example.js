// Import the 'mongoose' module
const mongoose = require("mongoose");

// Import the 'MONGO_URI' from the './keys' file
const { MONGO_URI } = require("./keys");

// Define an asynchronous function 'dbConnection' for connecting to the database
const dbConnection = async () => {
    try {
        // Attempt to connect to the MongoDB database using the 'MONGO_URI'
        await mongoose.connect(MONGO_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error(error);
        // If there's an error during the connection, log the error and throw a new error
        throw new Error("Error initializing the database");
    }
};

// Export an object with the 'dbConnection' function
module.exports = {
    dbConnection,
};