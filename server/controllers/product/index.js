const { Router: router } = require("express");

const { create } = require("./create");
const { list } = require("./list");
const { show } = require("./show");
const { update } = require("./update");
const { deleteProduct } = require("./deleteProduct");
const { uploadImage } = require("./uploadImage");
const multer = require("multer");
const upload = multer({
  limits: { files: 1 },
});

module.exports = () => {
  const api = router();

  api.post("/", create());
  api.post("/imageUpload", upload.single("productImage"), uploadImage());
  api.get("/", list());
  api.get("/:productId", show());
  api.put("/:productId", update());
  api.delete("/:productId", deleteProduct());

  return api;
};
