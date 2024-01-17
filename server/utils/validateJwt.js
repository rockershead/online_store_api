const request = require("request");
const jwkToPem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");

const {
  userPool,
  AmazonCognitoIdentity,
  poolData,
  poolRegion,
} = require("./cognito");

function validateJwt(idToken) {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `https://cognito-idp.${poolRegion}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
        json: true,
      },
      function (error, response, body) {
        if (error || response.statusCode !== 200) {
          resolve("Error! Unable to download JWKs");
          return;
        }

        const pems = {};
        const keys = body["keys"];
        keys.forEach((key) => {
          const { kid, n, e, kty } = key;
          const jwk = { kty: kty, n: n, e: e };
          const pem = jwkToPem(jwk);
          pems[kid] = pem;
        });

        // Validate the token
        const decodedJwt = jwt.decode(idToken, { complete: true });

        if (!decodedJwt) {
          resolve("Invalid Token");
          return;
        }

        const kid = decodedJwt.header.kid;
        const pem = pems[kid];
        if (!pem) {
          resolve("Invalid Token");
          return;
        }

        jwt.verify(idToken, pem, function (err, payload) {
          if (err) {
            resolve("Invalid Token");
          } else {
            resolve(payload);
          }
        });
      }
    );
  });
}

module.exports = { validateJwt };
