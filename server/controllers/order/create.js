const { Order, Product } = require("../../models");
const _ = require("lodash");
const { sendEmail } = require("../../utils");

const { uuid } = require("uuidv4");

const create = () => async (req, res, next) => {
  const { items, currency } = req.body;
  let total_cost = 0;
  const decodedToken = res.locals.result;
  const email = decodedToken.email;
  const productIds = _.map(items, "productId");
  /*const user = {
    email: decodedToken.email,
    name: decodedToken.name,
    phone_number: decodedToken.phone_number,
  };*/

  const products = await Product.find({ _id: { $in: productIds } });

  const groupedProductsById = _.keyBy(products, "_id");

  items.forEach((item) => {
    const { quantity, productId } = item;
    total_cost = total_cost + groupedProductsById[productId].price * quantity;
  });

  const order = new Order({
    items: items,
    email: email,
    currency: currency,
    totalPaid: Number(total_cost.toFixed(2)),
  });

  order
    .save()
    .then(async (result) => {
      res.status(200).send(result);
      await sendEmail(
        [email],
        "Successful Order",
        "You have successfully created an order"
      );
      console.log("email sent");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

module.exports = { create };
