const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.MONGO_DB_URI;
mongoose.set('strictQuery', true);
const connectDB = (uri = URI) => {
    mongoose
        .connect(uri, {
            useNewUrlParser: true,
        }).then(connection => {
            console.log("Connected to DB...");
        }).catch((err) => {
            console.log("error", err)
        })
}




module.exports = connectDB;