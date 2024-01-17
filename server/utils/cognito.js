const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
require("dotenv").config();

const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID,
  ClientId: process.env.COGNITO_CLIENT_ID,
};

const poolRegion = "ap-southeast-1";

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports = { userPool, AmazonCognitoIdentity, poolData, poolRegion };
