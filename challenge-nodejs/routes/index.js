const HelloController = require('../controllers/hello-controller');
const parseController = require('../controllers/parse-controller');
const searchController = require('../controllers/search-controller');

const helloRoute = {
  method: 'GET',
  path: '/',
  handler: HelloController,
}

const parseRoute = {
  method: 'POST',
  path: '/',
  handler: parseController
}

const viewRoute = {
  method: 'GET',
  path: '/search',
  handler: searchController
}

module.exports.helloRoute = helloRoute;
module.exports.parseRoute = parseRoute;
module.exports.viewRoute = viewRoute;
