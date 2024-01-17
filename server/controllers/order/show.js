const { Order } = require("../../models");
const { ROLES } = require("../../../library/Constants");

const show = () => async (req, res, next) => {
  const { orderId } = req.params;
  const decodedToken = res.locals.result;
  const role = decodedToken["custom:role"];
  const email = decodedToken.email;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    res.status(400).send("Order does not exist");
  }
  if (role == ROLES.SUPERADMIN) {
    res.status(200).send(order);
  } else if (order.user.email == email) {
    res.status(200).send(order);
  } else {
    res.status(400).send("Not authorized");
  }
};

module.exports = { show };
