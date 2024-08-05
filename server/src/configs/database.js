const mongoose = require("mongoose");
require("dotenv").config();
const URL = process.env.MONGO_URL;

console.log('url', URL)
const connect = () => {
    if (!URL) {
        throw new Error('MongoDB connection URL is not defined.');
    }
    mongoose.set("strictQuery", false);
    return mongoose.connect(URL, {
    });
};

module.exports = connect;