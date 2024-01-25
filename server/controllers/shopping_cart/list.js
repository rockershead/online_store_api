const { redisClient } = require("../../utils");
const { Product } = require("../../models");
const _ = require("lodash");
const { getFiles3Url } = require("../../utils");

async function populateProductInfo(items) {
  const productIds = _.map(items, "productId");
  const productDocs = await Product.find({ _id: { $in: productIds } })
    .lean()
    .exec();
  let promises = productDocs.map(async (product) => {
    const files3Url = await getFiles3Url(
      product.path,
      process.env.AWS_S3_BUCKET
    );

    product.productImageUrl = files3Url;
  });
  await Promise.all(promises);

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
