// server.js
'use strict';

const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const HapiSwagger = require('hapi-swagger');
const pug = require('pug');

const Pack = require('./package');
const config = require('./settings');
const routes = require('./routes');

exports.deployment = async () => {
  // create server
  const server = Hapi.server(config);

  // register plugins
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'Test API Documentation',
          version: Pack.version,
        },
      }
    }
  ]);

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