const Path = require('path');

const parseController = require('../controllers/parse-controller');
const viewController = require('../controllers/view-controller');
const searchController = require('../controllers/search-controller');

const parseRoute = {
  method: 'POST',
  path: '/',
  handler: parseController
}

const viewRoute = {
  method: 'GET',
  path: '/',
  handler: viewController
}

const searchRoute = {
  method: 'POST',
  path: '/search',
  handler: searchController
}

const jsRoute = {
  method: 'GET',
  path: '/public/{param*}',
  handler: {
    directory: {
      path: Path.normalize(__dirname + '/public')
    }
  }
}
// path: '/{param*}',
    
module.exports = [
  parseRoute,
  viewRoute,
  searchRoute,
  jsRoute
]
