const { Product } = require("../../models");
const { uuid } = require("uuidv4");
const { ROLES } = require("../../../library/Constants");
const create = () => async (req, res, next) => {
  const { path, description, price, name, currency } = req.body;
  const decodedToken = res.locals.result;
  const role = decodedToken["custom:role"];
  if (role == ROLES.SUPERADMIN) {
    //check if product exists
    const productCheckName = await Product.findOne({ name: name });
    const productCheckImage = await Product.findOne({
      path: path,
    });

    if (productCheckImage || productCheckName) {
      res.status(400).send("This product already exists");
    }

    const product = new Product({
      path: path,
      description: description,
      price: price,
      name: name,
      currency: currency,
    });

    product
      .save()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } else {
    res.status(400).send("Not authorised");
  }
};

module.exports = { create };
