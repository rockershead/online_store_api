const { redisClient } = require("../../utils");
//KIV
const showItem = () => async (req, res, next) => {
  //get the userId and set that id to the products
  const decodedToken = res.locals.result;
  const email = decodedToken.email;
  const { productId } = req.params;

  const cart = await redisClient.get(email);
  console.log(cart);
  if (cart) {
    const products = JSON.parse(cart);
    const items = products.filter((obj) => obj.productId === productId);
    console.log(items);
    res.status(200).send(items[0]);
  } else {
    res.status(400).send("User has not created cart");
  }
};

module.exports = { showItem };
