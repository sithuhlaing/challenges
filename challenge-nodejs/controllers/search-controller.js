const searchViewController = (request, h) => {
  return h.view('index', { title: 'Homepage', message: 'Welcome' });
}

module.exports = searchViewController;