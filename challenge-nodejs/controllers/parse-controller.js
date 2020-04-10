// const Obj = Joi.object({
//   id: Joi.number().required(),
//   title: Joi.string().required(),
//   level: Joi.number().required(),
//   children: Joi.array(),
//   parent_id: Joi.number(),
// });

const parseNode = (parent, objs) => {
  const children = objs.filter(x => x.parent_id === parent.id);
  parent.children = children;
  if(children) {
    children.map(child => parseNode(child, objs));
  }
  return parent;
}

const getObjs = (obj) => {
  let objs = [];

  for(let key of Object.keys(obj)) {
    objs.push(...obj[key]);
  }

  return objs;
}

const parseController = (request, h) => {
  const json = request.payload;
  const objs = getObjs(json);
  const root = objs.find(x => x.parent_id === null);
  return parseNode(root, objs);
}

module.exports = parseController;