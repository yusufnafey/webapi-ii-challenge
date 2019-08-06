const express = require("express");
const db = require("./data/db.js");
// const router = require("./index.js");

const server = express();
server.use(express.json());
// server.use("/api/posts", router);

server.post("/", (req, res) => {
  const user = req.body;
  if (!user.title || !user.contents) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.insert(user)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the user to the database."
        });
      });
  }
});

server.get("/", (req, res) => {
  db.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved. " });
    });
});

const port = 8000;
server.listen(port, () => console.log(`API running in port ${port}`));
