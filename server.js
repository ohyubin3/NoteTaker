const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const db = require("./db/db.json");
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {});

app.listen(PORT, () =>
  console.log("listening on port http://localhost:" + PORT)
);
