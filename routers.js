const router = require("express").Router();

router.post("/api/posts", (req, res) => {
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

// server.post('/:id/comments', (req, res)) => {
//     const user = req.body
//     const { id } = req.params

// }

router.get("/api/posts", (req, res) => {
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

router.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post.id) {
        ////////// why do I have to put id?
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

router.delete("/api/posts/:id", (req, res) => {
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

// server.put("/api/posts/:id", (req, res) => {
//   const { id } = req.params;
//   const post = req.body;

//   if (!post.title || !post.contents) {
//     res.status(404).json({
//       errorMessage: "Please provide title and contents for the post. "
//     });
//   } else {
//     db.update(id)
//       .then(post => {
//         if (post) {
//           res.status(200).json(post);
//         } else {
//           res.status(404).json({
//             message: "The post with the specified ID does not exist. "
//           });
//         }
//       })
//       .catch(error => {
//         res
//           .status(500)
//           .json({ error: "The post information could not be modified. " });
//       });
//   }
// });

module.exports = router;
