const Joi = require('@hapi/joi');

const element = Joi.array().items(
  Joi.object({
    id: Joi.number().optional(),
    title: Joi.string().optional(),
    level: Joi.number().optional(),
    children: Joi.array().optional(),
    parent_id: Joi.number().optional().allow(null),
  })
)

const schema = Joi.object({
  '0': element,
  '1': element,
  '2': element,
})

// parse for parent and combine with parent
const parseNode = (parent, objs) => {
  const children = objs.filter(x => x.parent_id === parent.id);
  parent.children = children;
  if(children) {
    children.map(child => parseNode(child, objs));
  }
  return parent;
}

// to object array
const getObjs = (obj) => {
  let objs = [];

  for(let key of Object.keys(obj)) {
    objs.push(...obj[key]);
  }

  return objs;
}

const parseController = (request, h) => {
  // get from request json
  const json = request.payload;
  // parse the object
  const objs = getObjs(json);
  // for root object
  const root = objs.find(x => x.parent_id === null);
  // parse it
  return parseNode(root, objs);
}

module.exports.parseController = parseController;
module.exports.schema = schema;