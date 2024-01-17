const { Order } = require("../../models");
const { ROLES } = require("../../../library/Constants");
const update = () => async (req, res, next) => {
  const { orderId } = req.params;

  const order = await Order.findOne({ _id: orderId });
  const decodedToken = res.locals.result;
  const role = decodedToken["custom:role"];
  if (role == ROLES.SUPERADMIN) {
    if (order) {
      const res = await Order.updateOne({ _id: orderId }, req.body);
      res.status(200).send(res);
    } else {
      res.status(400).send("This order does not exist");
    }
  }
};

module.exports = { update };
