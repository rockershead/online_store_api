const { Order } = require("../../models");
const { ROLES } = require("../../../library/Constants");
const deleteOrder = () => async (req, res, next) => {
  const { orderId } = req.params;

  const order = await Order.findOne({ _id: orderId });
  const decodedToken = res.locals.result;
  const role = decodedToken["custom:role"];
  if (role == ROLES.SUPERADMIN) {
    if (order) {
      await Order.deleteOne({ _id: orderId });
      res.status(200).send("Order deleted successfully");
    } else {
      res.status(400).send("Order does not exist");
    }
  }
};

module.exports = { deleteOrder };
