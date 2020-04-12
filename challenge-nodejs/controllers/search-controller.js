const axios = require('axios');

const getRepositories = async ({q, page, per_page}) => {
  try {
    return await axios
      .get('https://api.github.com/search/repositories', { 
        params: { 
          q,
          per_page,
          page,
        },
        headers: {
          "Authorization" : "token fb2beb941775fb86c8893648b5ee531f7e0d9d12"
        }
      });
  } catch (error) {
    console.error(error);
  }
}

const searchController = async (request, h) => {
  const { data } = await getRepositories(request.payload);
  return data;
}

module.exports = searchController;