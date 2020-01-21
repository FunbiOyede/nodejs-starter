const app = require("./loaders/express");
require("./loaders/mongoose")();
const config = require("./config/index");

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
