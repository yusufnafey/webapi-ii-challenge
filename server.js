const express = require("express");
const db = require("./data/db.js");
// const router = require("./index.js");

const server = express();
server.use(express.json());
// server.use("/api/posts", router);

server.post("/", (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents) {
    res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post."
      });
  } else {
    db.insert(post)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the post to the database."
        });
      });
  }
});

// server.post('/:id/comments', (req, res)) => {
//     const user = req.body
//     const { id } = req.params

// }

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

server.get("/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist. " });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved. " });
    });
});

server.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist. " });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "THe user could not be removed. " });
    });
});

const port = 8000;
server.listen(port, () => console.log(`API running in port ${port}`));
