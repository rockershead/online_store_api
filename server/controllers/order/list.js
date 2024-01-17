const { Order, Product } = require("../../models");
const { ROLES } = require("../../../library/Constants");
const _ = require("lodash");

async function populateProductInfo(orders) {
  const allItems = _.flatMap(orders, "items");

  const productIds = _.map(allItems, "productId");
  const productDocs = await Product.find({ _id: { $in: productIds } });
  const groupedDocsById = _.keyBy(productDocs, "_id");

  orders.forEach((order) => {
    order.items.forEach((item) => {
      item.product = groupedDocsById[item.productId];
    });
  });

  return orders;
}

//pagination
const list = () => async (req, res, next) => {
  const { page, pageSize } = req.query;
  const decodedToken = res.locals.result;
  const role = decodedToken["custom:role"];

  if (role == ROLES.SUPERADMIN) {
    try {
      const skip = (page - 1) * pageSize;
      const orders = await Order.find(req.query)
        .skip(skip)
        .limit(pageSize)
        .lean()
        .exec(); //so that can modify the objects or else cannot
      console.log(orders);
      const populatedOrdersWithProductInfo = await populateProductInfo(orders);

      res.status(200).send(populatedOrdersWithProductInfo);
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

module.exports = { list, populateProductInfo };
