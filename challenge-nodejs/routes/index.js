const Path = require('path');

const { schema:parseSchema, parseController } = require('../controllers/parse-controller');
const { schema:searchSchema, searchController} = require('../controllers/search-controller');
const viewController = require('../controllers/view-controller');

const parseRoute = {
  method: 'POST',
  path: '/',
  options: {
    handler: parseController,
    description: 'Parse JSON',
    notes: 'Returns a JSON with root',
    tags: ['api'],
    validate: {
      payload: parseSchema
    }
  }
}

const viewRoute = {
  method: 'GET',
  path: '/',
  handler: viewController
}

const searchRoute = {
  method: 'POST',
  path: '/search',  
  options: {
    handler: searchController,
    description: 'search GitHub Repositories',
    notes: 'Returns list of GitHub Repositories',
    tags: ['api'],
    validate: {
      payload: searchSchema 
    }
  }
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
    
module.exports = [
  parseRoute,
  viewRoute,
  searchRoute,
  jsRoute
]
