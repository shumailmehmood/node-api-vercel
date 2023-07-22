const express = require('express')
var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
const config = require("config");
var fs = require("fs");
var cors = require("cors");
var app = express();
require("dotenv").config();
const app = express()
const PORT = 4000
const mongoose = require("mongoose");

let URL1 =
    "mongodb+srv://shumail:iloveyou_786@margallah-gxjmf.mongodb.net/industry?retryWrites=true&w=majority";
mongoose
    .connect(URL1, {
        useNewUrlParser: true,
    })
    .then(() => console.log("MongoDb successsFully Connected!!"))
    .catch((err) => console.log("Errror in connecting mongodb", err));

// app.use(morgan());
// app.use("/uploads/", express.static("uploads"));
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
    res.send('This is my about route..... ')
})
app.get('/test', (req, res) => {
    res.send('Test runs successfully')
})

app.listen(PORT, () => {
    console.log(`API listening on PORT ${PORT} `)
})

// Export the Express API
module.exports = app