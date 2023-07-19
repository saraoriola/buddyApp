const mongoose = require("mongoose");
//const { MONGO_URI } = require("./keys");
require('dotenv').config()

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error(error);
        throw new Error("Error initializing the database");
    }
};

module.exports = {
    dbConnection,
};