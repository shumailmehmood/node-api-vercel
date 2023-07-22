const express = require('express')

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

app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
    res.send('This is my about route..... ')
})

app.listen(PORT, () => {
    console.log(`API listening on PORT ${PORT} `)
})

// Export the Express API
module.exports = app