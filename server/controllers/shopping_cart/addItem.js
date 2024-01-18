const { redisClient } = require("../../utils");

const addItem = () => async (req, res, next) => {
  const item = req.body; //is an object //{"productId":"","quantity":""}
  const decodedToken = res.locals.result;

  //get the email and set that email to the products
  const email = decodedToken.email;
  console.log(email);
  const products = await redisClient.get(email);

  let productArr;
  if (products) {
    productArr = JSON.parse(products);
  } else {
    productArr = [];
  }
  productArr.push(item);
  await redisClient.set(email, JSON.stringify(productArr));
  const cart = await redisClient.get(email);
  res.status(200).send(`${cart}`);
};

module.exports = { addItem };
