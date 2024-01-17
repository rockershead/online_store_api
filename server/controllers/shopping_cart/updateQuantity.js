const { redisClient } = require("../../utils");
const _ = require("lodash");

const updateQuantity = () => async (req, res, next) => {
  const { productId, quantity } = req.body; //is an array
  const decodedToken = res.locals.result;
  //get the email and set that email to the products
  const email = decodedToken.email;
  const products = await redisClient.get(email);
  const productArr = JSON.parse(products);
  if (products) {
    productArr.forEach((product) => {
      if (product.productId == productId) {
        product.quantity = quantity;
      }
    });
  }

  await redisClient.set(email, JSON.stringify(productArr));
  const cart = await redisClient.get(email);
  res.status(200).send(`${cart}`);
};

module.exports = { updateQuantity };
