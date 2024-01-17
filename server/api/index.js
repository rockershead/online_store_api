const express = require("express");

const { errorHandler, permissionHandler } = require("../middleware");

// List all controllers here

const users = require("../controllers/users");
const products = require("../controllers/product");
const shopping_cart = require("../controllers/shopping_cart");
const orders = require("../controllers/order");
const auth = require("../controllers/auth");

const routersInit = (config) => {
  const router = express();

  router.use("/auth", auth());

  //router.use(permissionHandler);

  // Define API Endpoints
  router.use("/users", users());
  router.use("/products", products());
  router.use("/cart", shopping_cart());
  router.use("/orders", orders());
  // Catch all API Errors
  router.use(errorHandler);
  return router;
};

module.exports = routersInit;
