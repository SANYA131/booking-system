require("dotenv").config();
const server = require("./server").server();

async function init() {
  try {
    await server.create();
    server.start();
  } catch (err) {
    logger.error(err);
  }
}

init();
