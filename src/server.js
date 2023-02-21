const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.config");
require("dotenv").config()
const routes = require("./routes/exchange");
const { CustomAPIError } = require("./errors/error-handler")
const _app_folder = 'dist/frontend';
const errorHanlerMiddleware = (err, req, res, next) => {
    if (!err) {
        if (err instanceof CustomAPIError) {
            return res.status(err.statusCode).json({ msg: err.message });
        }
        return res.status(500).json({ msg: `Something went wrong, try again later!` })
    }
    next();
}
const app = express();
app.use(express.static(_app_folder, { maxAge: '1y' }));
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:4200"] }));
app.use("/api/exchange", routes);
// app.all('/', function (req, res) {
//     res.status(200).sendFile(`/`, { root: _app_folder });
// });
app.use("/", (req, res) => {
    console.log(__dirname);
    res.sendFile(__dirname + "/dist/frontend/index.html")
})
app.use(errorHanlerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on ${PORT}`);
})











