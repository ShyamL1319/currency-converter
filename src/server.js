const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.config");
const routes = require("./routes/exchange");
const { CustomAPIError } = require("./errors/error-handler");
const serverless = require("serverless-http")
const _app_folder = 'public';
const path = require("path")
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
app.use(express.static(path.resolve(__dirname, 'public', 'dist'), { extensions: ["js", "text/html"] }))
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api/exchange", routes);
// app.all('/', function (req, res) {
//     res.status(200).sendFile(`/`, { root: _app_folder });
// });
app.use("/*", (req, res) => {
    console.log(path.join(__dirname, "dist/public", "index.html"));
    res.sendFile(path.join(__dirname, "dist/public", "index.html"))
})
app.use(errorHanlerMiddleware);
connectDB()
module.exports = app;
// module.exports.handler = serverless(app);









