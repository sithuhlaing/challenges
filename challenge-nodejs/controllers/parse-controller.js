// const Obj = Joi.object({
//   id: Joi.number().required(),
//   title: Joi.string().required(),
//   level: Joi.number().required(),
//   children: Joi.array(),
//   parent_id: Joi.number(),
// });

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

module.exports = parseController;