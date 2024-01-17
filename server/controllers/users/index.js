const { Router: router } = require("express");
//const passport = require('passport');

const { list } = require("./list");

const { updateCurrentUser } = require("./updateCurrentUser");
const { show } = require("./show");
const { getCurrentUser } = require("./getCurrentUser");

module.exports = () => {
  const api = router();

  api.get("/", list());

  api.put("/updateCurrentUser", updateCurrentUser());
  api.get("/show/:id", show());
  api.get("/getCurrentUser", getCurrentUser());

  return api;
};
