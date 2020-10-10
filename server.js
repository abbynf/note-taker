var express = require("express");
const path = require('path');

var app = express();
var PORT = process.env.PORT || 8080;

app.use( express.static(__dirname + '/public' ) );

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

var notesData = require("./db/db.json");

console.log(notesData.length)

app.get("/api/notes", function(req, res) {
    return res.json(notesData);
  });

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})


//   Keep this after all other routes
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});