'use strict';

const Hapi = require('@hapi/hapi');
const View = require('@hapi/vision');
const pug = require('pug');
const config = require('./settings');
const route = require('./routes');

const init = async () => {
  // create server
  const server = Hapi.server(config);
  // register plugins
  await server.register(View);
  server.views({
    engines: {
      pug
    },
    relativeTo: './public',
    path: 'views'
  });
  // add routes
  server.route(route.helloRoute);
  server.route(route.parseRoute);
  server.route(route.viewRoute);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();