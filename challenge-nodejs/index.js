'use strict';

const Server = require('./server');

async function start() {

  let server = null;
  try {
    server = await Server.deployment();
    await server.start();
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

start();