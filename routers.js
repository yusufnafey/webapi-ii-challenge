const router = require("express").Router();
const db = require("./data/db.js");

router.post("/", (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents) {
    res.status(400).json({
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

// router.post("/:id/comments", (req, res) => {
//   const post = req.body;
//   const { id } = req.params;
// });

router.get("/", (req, res) => {
  db.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved. " });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post) {
        // if I don't put post.id, code 404 doesn't work.
        // if I do put post.id, code 200 doesn't work
        // the same logic works fine with router.delete
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist. " });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved. " });
    });
});

// server.get('/:id/comments', (req, res) => {
//     const { id } = req.params

//     db.findById(id)
// })

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist. " });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be removed. " });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!post.title || !post.contents) {
    res.status(404).json({
      errorMessage: "Please provide title and contents for the post. "
    });
  } else {
    db.update(id, post)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist. "
          });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The post information could not be modified. " });
      });
  }
});

module.exports = router;
