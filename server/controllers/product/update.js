const { Product } = require("../../models");
const { ROLES } = require("../../../library/Constants");

const update = () => async (req, res, next) => {
  const { productId } = req.params;
  const decodedToken = res.locals.result;
  const role = decodedToken["custom:role"];
  const product = await Product.findOne({ _id: productId });
  if (role == ROLES.SUPERADMIN) {
    if (product) {
      const res = await Product.updateOne({ _id: productId }, req.body);
      res.status(200).send(res);
    } else {
      res.status(400).send("This product does not exist");
    }
  } else {
    res.status(400).send("Not authorized");
  }
};

module.exports = { update };
