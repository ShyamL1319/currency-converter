const mongoose = require("mongoose");
const URI = "mongodb+srv://task-mgmt:12345@cluster0.6qsga9k.mongodb.net/exchange";
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