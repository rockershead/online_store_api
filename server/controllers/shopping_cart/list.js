const { redisClient } = require("../../utils");
const { Product } = require("../../models");
const _ = require("lodash");

async function populateProductInfo(items) {
  const productIds = _.map(items, "productId");
  const productDocs = await Product.find({ _id: { $in: productIds } });
  const groupedDocsById = _.keyBy(productDocs, "_id");

  items.forEach((item) => {
    item.product = groupedDocsById[item.productId];
  });

  return items;
}

const list = () => async (req, res, next) => {
  //get the userId and set that id to the products
  const decodedToken = res.locals.result;
  const email = decodedToken.email;

  const cart = await redisClient.get(email);
  if (cart) {
    const populatedCart = await populateProductInfo(JSON.parse(cart));
    res.status(200).send(populatedCart);
  } else {
    res.status(400).send("User Cart does not exist");
  }
};

module.exports = { list };
