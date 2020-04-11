// server.js
'use strict';

const Hapi = require('@hapi/hapi');
const View = require('@hapi/vision');
const inert = require('@hapi/inert');

const pug = require('pug');

const config = require('./settings');
const routes = require('./routes');

exports.deployment = async () => {
  // create server
  const server = Hapi.server(config);

  // register plugins
  await server.register(View);
  await server.register(inert);
  server.views({
    engines: {
      pug
    },
    relativeTo: './public',
    path: './'
  });

  // add routes
  server.route(routes);

  return server;
};