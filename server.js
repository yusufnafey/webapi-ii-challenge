const express = require("express");
// const router = require("./index.js");

const server = express();
server.use(express.json());
// server.use("/api/posts", router);

const port = 8000;
server.listen(port, () => console.log(`API running in port ${port}`));
