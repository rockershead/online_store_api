const { Product } = require("../../models");
const { getFiles3Url } = require("../../utils");
//implememt search feature,pagination
const list = () => async (req, res, next) => {
  const { page, pageSize, search, ...otherParams } = req.query;
  const skip = (page - 1) * pageSize;

  const _query = {
    ...otherParams,
  };
  console.log(search);
  if (search) {
    const regex = new RegExp(search, "i");
    _query.$or = [{ description: regex }, { name: regex }];
  }

  try {
    const result = await Product.find(_query)
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec(); //need lean and exec so that I am able to edit the objects in result
    //need to add in the signedUrl in
    let promises = result.map(async (product) => {
      const files3Url = await getFiles3Url(
        product.path,
        process.env.AWS_S3_BUCKET
      );

      product.productImageUrl = files3Url;
    });
    await Promise.all(promises);

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { list };
