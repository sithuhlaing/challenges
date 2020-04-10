// server.js
'use strict';

const Hapi = require('@hapi/hapi');
const View = require('@hapi/vision');
const pug = require('pug');
const config = require('./settings');
const routes = require('./routes');

exports.deployment = async () => {

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
  server.route(routes);

  return server;
};