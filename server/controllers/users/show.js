//admin  can see any user
//if not admin can see only their own profile

const { ROLES } = require("../../../library/Constants");
const { User } = require("../../models");

const show = () => async (req, res, next) => {
  const decodedToken = res.locals.result;
  const role = decodedToken["custom:role"];
  const email = decodedToken.email;
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (role == ROLES.SUPERADMIN) {
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).send("User does not exist");
    }
  } else {
    res.status(400).send("Not authorized");
  }
};

module.exports = { show };
