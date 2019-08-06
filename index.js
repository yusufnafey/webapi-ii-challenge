const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("testing");
});

module.exports = router;
