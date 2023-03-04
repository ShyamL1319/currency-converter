const mongoose = require("mongoose");
const URI = process.env.MONGO_DB_URI;
require("dotenv").config();
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