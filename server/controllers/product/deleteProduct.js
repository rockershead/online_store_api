const { Product } = require("../../models");
const { ROLES } = require("../../../library/Constants");
const deleteProduct = () => async (req, res, next) => {
  const { productId } = req.params;
  const decodedToken = res.locals.result;
  const role = decodedToken["custom:role"];

  if (role == ROLES.SUPERADMIN) {
    const product = await Product.findOne({ _id: productId });

    if (product) {
      await Product.deleteOne({ _id: productId });
      res.status(200).send("Product record deleted successfully");
    } else {
      res.status(400).send("This product does not exist");
    }
  } else {
    res.status(400).send("Not authorised");
  }
};

module.exports = { deleteProduct };
