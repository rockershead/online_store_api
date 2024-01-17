const { populateProductInfo } = require("./list");
const { Order, Product } = require("../../models");
//pagination
const showMyOrders = () => async (req, res, next) => {
  const decodedToken = res.locals.result;
  const email = decodedToken.email;
  const { page, pageSize } = req.query;
  const skip = (page - 1) * pageSize;

  try {
    const orders = await Order.find({ email: email })
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec(); //so that can modify the objects or else cannot

    const populatedOrdersWithProductInfo = await populateProductInfo(orders);

    res.status(200).send(populatedOrdersWithProductInfo);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { showMyOrders };
