const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const db = require("./db/db.json");
const app = express();
const uuid = require("./helpers/uuid");
const { readFromFile, readAndAppend } = require("./helpers/fsUtils");

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// bring the text data
app.get("/api/notes", (req, res) => {
  readFromFile("./db/db.json").then((text) => res.json(JSON.parse(text)));
});

// send the text data
app.post("/api/notes", (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;
  if (req.body) {
    const noteData = {
      title,
      text,
      id: uuid(),
    };
    readAndAppend(noteData, "./db/db.json");
    res.json(`Your notes have been saved`);
  } else {
    res.error("Error");
  }
});

app.listen(PORT, () =>
  console.log("listening on port http://localhost:" + PORT)
);
