'use strict';

const Server = require('./server');

const start = async () => {
  const server = await Server.deployment();
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
}

const init = async () => {
  const server = await Server.deployment();
  await server.initialize();
  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

start();

module.exports.start = start;
module.exports.init = init;