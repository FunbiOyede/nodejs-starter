const express = require("express");
// const http = require("http");
require("./loaders/mongoose")();
const config = require("./config/index");
const app = express();

app.listen(config.port, err => {
  if (err) {
    process.exit(1);
    console.log(err);
  }
  console.log(`
       **********************************************
      🛡️  Server listening on port: ${config.port}
       **********************************************
    `);
});
