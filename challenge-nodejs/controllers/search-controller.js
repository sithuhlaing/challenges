const axios = require('axios');
const Joi = require('@hapi/joi');

const schema = Joi.object({
  q: Joi.string().required(),
  per_page: Joi.number().required(),
  page: Joi.number().required()
})

const getRepositories = async ({q, page, per_page}) => {
  try {
    return await axios
      .get('https://api.github.com/search/repositories', { 
        params: { 
          q,
          per_page,
          page,
        },
      });
  } catch (error) {
    console.error(error);
  }
}

const searchController = async (request, h) => {
  const { data } = await getRepositories(request.payload);
  return data;
}

module.exports.searchController = searchController;
module.exports.schema = schema;