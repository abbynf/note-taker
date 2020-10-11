var express = require("express");
const path = require('path');
var moment = require('moment');

var app = express();
var PORT = process.env.PORT || 8080;

function requireUncached(module){
  delete require.cache[require.resolve(module)];
  return require(module);
}

// delete the cached module
function db(){
  const dbFile = requireUncached("./db/db.json");
  return dbFile;
  };

var fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use( express.static(__dirname + '/public' ) );

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/api/notes", function(req, res) {
  res.json(db());
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

function newId(){
  return moment().format('MMDDYYYYhhmmssa');
}

app.post("/api/notes", function(req, res) {
  var obj;
  var json;
  var newSavedNote = {
    "title" : req.body.title,
    "text" : req.body.text,
    "id" : newId()
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
  newdb = [];
  var chosenid = req.params.id;
  for (i = 0; i < db().length; i++){
    if (chosenid === db()[i].id){

    }
    else {
      newdb.push(db()[i]);
    }

  }
  // writes the db file with the edited array
  fs.writeFile("./db/db.json", JSON.stringify(newdb), function(err){
    if (err) {
    return console.log(err)
    }
  })
  res.send(true)
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});