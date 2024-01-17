const { redisClient } = require("../../utils");

const clearCart = () => async (req, res, next) => {
  //get the userId and set that id to the products
  const decodedToken = res.locals.result;
  const email = decodedToken.email;

  const cart = await redisClient.get(email);

  if (cart) {
    await redisClient.set(email, JSON.stringify([]));
    const result = await redisClient.get(email);
    res.status(200).send(`${result}`);
  } else {
    res.status(400).send("User has not created cart");
  }
};

module.exports = { clearCart };
