const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(`hello world form NodeJS Express! ${req}`);
});

app.get("/login", (req, res) => {
  res.send("this is login page");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});