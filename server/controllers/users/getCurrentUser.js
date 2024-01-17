const { ROLES } = require("../../../library/Constants");
const { User } = require("../../models");

const getCurrentUser = () => async (req, res, next) => {
  console.log("here");
  const decodedToken = res.locals.result;
  console.log(decodedToken);
  const role = decodedToken["custom:role"];
  const email = decodedToken.email;

  const user = await User.findOne({ email: email });

  if (user) {
    res.status(200).send(user);
  } else {
    res.status(400).send("User does not exist");
  }
};

module.exports = { getCurrentUser };
