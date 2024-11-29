const express = require("express");
const helmet = require("helmet");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();

app.use(helmet());

app.use(express.static("public"));
app.disable("strict-transport-security");

const api = require("./server.js");
app.use("/_api", api);

app.get("/", (req, res) => {
  return handle(req, res);
});

app.get("*", (req, res) => {
  return handle(req, res);
});

let port = process.env.PORT || 3000;

nextApp.prepare().then(() => {
  app.listen(port, () => {
    console.log(`Your app is listening on port ${port}`);
  });
});
