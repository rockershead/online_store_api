const { Router: router } = require("express");

const { addItem } = require("./addItem");
const { list } = require("./list");
const { deleteItem } = require("./deleteItem");
const { showItem } = require("./showItem");
const { updateQuantity } = require("./updateQuantity");
const { clearCart } = require("./clearCart");

module.exports = () => {
  const api = router();

  api.post("/", addItem());
  api.post("/clear_cart", clearCart());
  api.post("/update_quantity", updateQuantity());
  api.get("/", list());
  api.delete("/:productId", deleteItem());
  api.get("/:productId", showItem());

  return api;
};
