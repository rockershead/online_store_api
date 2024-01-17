const { hashPassword, comparePassword } = require("./helper");
const { sendEmail } = require("./email");
const { uploadFile, getFiles3Url } = require("./s3");
const { validateJwt } = require("./validateJwt");
const { redisClient } = require("./redisClient");

const {
  userPool,
  AmazonCognitoIdentity,
  poolData,
  poolRegion,
} = require("./cognito");

module.exports = {
  hashPassword,
  comparePassword,
  sendEmail,
  uploadFile,
  getFiles3Url,
  poolData,
  poolRegion,
  userPool,
  AmazonCognitoIdentity,
  validateJwt,
  redisClient,
};
