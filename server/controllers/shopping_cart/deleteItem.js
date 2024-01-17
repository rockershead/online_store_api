const { redisClient } = require("../../utils");

const deleteItem = () => async (req, res, next) => {
  //get the userId and set that id to the products
  const decodedToken = res.locals.result;
  const email = decodedToken.email;
  const { productId } = req.params;

  const cart = await redisClient.get(email);
  const products = JSON.parse(cart);
  if (cart && products.length > 0) {
    const updatedArr = products.filter((obj) => obj.productId !== productId);

    await redisClient.set(email, JSON.stringify(updatedArr));
    const result = await redisClient.get(email);
    res.status(200).send(`${result}`);
  } else {
    res.status(400).send("User has not created cart");
  }
};

module.exports = { deleteItem };
