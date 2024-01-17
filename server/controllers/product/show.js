//User.find( { age: { $gt: 4 } } )   eg query

//we can findById.But here I am using other fields to find
const { Product } = require("../../models");

const show = () => async (req, res, next) => {
  const { productId } = req.params;
  

  const product = await Product.findOne({ _id: productId });
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(400).send("This product does not exist");
  }
};

module.exports = { show };
