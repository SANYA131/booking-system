const express = require("express");
const bodyParser = require("body-parser");

const ApiRouter = require("./routes");

const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const db = require("../firebase");

exports.server = () => {
  const server = express();

  const create = async () => {
    server.set("port", process.env.PORT || 3000);
    server.set("hostname", process.env.HOSTNAME || "localhost");

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.use("/booking", ApiRouter);

    server.use(notFound);
    server.use(errorHandler);
  };

  const start = () => {
    const hostname = server.get("hostname");
    const port = server.get("port");

    server.listen(port, () => {
      console.log(`service listening on - http://${hostname}:${port}`);
    });
  };

  return {
    create,
    start,
  };
};
