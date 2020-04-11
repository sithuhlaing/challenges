const searchViewController = (request, h) => {
  return h.view('index', { title: 'SearchPage', message: 'Search' });
}

module.exports = searchViewController;