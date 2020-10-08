var express = require("express");
const path = require('path');

var app = express();
var PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

