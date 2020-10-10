var express = require("express");
const path = require('path');

var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./db/db.json");

var fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use( express.static(__dirname + '/public' ) );

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

var notesData = require("./db/db.json");

app.get("/api/notes", function(req, res) {
    return res.json(notesData);
  });

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

function newId(note){
  return note.title;
}

app.post("/api/notes", function(req, res) {
  var newSavedNote = {
    "title" : req.body.title,
    "text" : req.body.text,
    "id" : newId(req.body)
  }
  fs.readFile('./db/db.json', 'utf8', function (err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data); //now it an object
    obj.push(newSavedNote); //add some data
    json = JSON.stringify(obj); //convert it back to json
    fs.writeFile('./db/db.json', json, 'utf8', function (err){
      if (err) {
        console.log(err)
      }
    }); // write it back 
}});
  res.send(true);
})

//   Keep this after all other routes
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.delete("/api/notes/:id", function (req, res) {
  var chosenid = req.params.id;
  for (i = 0; i < db.length; i++){
    if (chosenid === db[i].id){
      var newdb = db.splice(i, 1);
    }
  }
  // writes the db file with the edited array
  fs.writeFile("./db/db.json", JSON.stringify(newdb), function(err){
    if (err) {
      return console.log(err)
    }
  })
  console.log(db);
  res.send(true)
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});