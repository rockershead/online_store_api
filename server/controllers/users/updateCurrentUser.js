//admin cant update profile of others
//each user can only update their own profile

const { User } = require("../../models");
const { ROLES } = require("../../../library/Constants");

const updateCurrentUser = () => async (req, res, next) => {
  const { userId } = req.params;
  const decodedToken = res.locals.result;
  const role = decodedToken["custom:role"];
  const email = decodedToken.email;

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(400).send("User does not exist");
  }

  const result = await User.updateOne({ email: email }, req.body);
  res.status(200).send(result);
};

module.exports = { updateCurrentUser };
