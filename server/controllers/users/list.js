const { User } = require("../../models");
const { ROLES } = require("../../../library/Constants");
const list = () => async (req, res, next) => {
  //pagination,search
  const decodedToken = res.locals.result;
  const role = decodedToken["custom:role"];
  if (role == ROLES.SUPERADMIN) {
    const { page, pageSize, search, ...otherParams } = req.query;
    const skip = (page - 1) * pageSize;

    const _query = {
      ...otherParams,
    };

    if (search) {
      const regex = new RegExp(search, "i");
      _query.$or = [{ email: regex }, { name: regex }];
    }
    try {
      const result = await User.find(_query).skip(skip).limit(pageSize);

      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send("Not authorised");
  }
};

module.exports = { list };
