var express = require("express");
const path = require('path');

var app = express();
var PORT = process.env.PORT || 8080;

var notes = {
    "John": "doe",
    "Harry": "Potter"
}

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});



app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

var notesData = require("./db/db.json");

app.get("/api/notes", function(req, res) {
    return res.json(notesData);
  });

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})