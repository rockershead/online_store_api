const { uploadFile } = require("../../utils");
const { ROLES } = require("../../../library/Constants");

const uploadImage = () => async (req, res, next) => {
  const { mimetype, originalname, buffer } = req.file;

  const decodedToken = res.locals.result;
  const role = decodedToken["custom:role"];
  if (role == ROLES.SUPERADMIN) {
    if (mimetype == "image/png" || mimetype == "image/jpeg") {
      const path = `product-images/${originalname}`;

      await uploadFile(path, process.env.AWS_S3_BUCKET, buffer);
      //no use the signedUrl max expiry time is 7 days
      //res.status(200).send({ path: path, signedUrl: signedUrl });
      res.status(200).send({ path: path });
    } else {
      res.status(400).send("Please upload either a jpeg or png image");
    }
  } else {
    res.status(400).send("Not authorized");
  }
};

module.exports = { uploadImage };
