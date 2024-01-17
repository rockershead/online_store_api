const { Router: router } = require("express");

const { registerWithCognito } = require("./registerWithCognito");

const { loginWithCognito } = require("./loginWithCognito");
const { resetPassword, confirmPassword } = require("./resetPassword");
const { logout } = require("./logout");

module.exports = () => {
  const api = router();

  api.post("/register", registerWithCognito());

  api.post("/login", loginWithCognito());
  api.post("/resetPassword", resetPassword());
  api.post("/confirmResetPassword", confirmPassword());
  api.post("/logout", logout());

  return api;
};
