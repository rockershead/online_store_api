const { poolData, poolRegion, userPool, AmazonCognitoIdentity } = require(".");
const {
  CognitoUserSession,
  CognitoIdToken,
  CognitoAccessToken,
  CognitoRefreshToken,
  CognitoUserAttribute,
} = require("amazon-cognito-identity-js");
const { ROLES } = require("../../library/Constants");

//only admin role can do tis

async function updateJwt(
  email,
  idToken,
  accessToken,
  refreshToken,
  attribute,
  value
) {
  const id_token = new CognitoIdToken({
    IdToken: idToken,
  });

  const access_token = new CognitoAccessToken({
    AccessToken: accessToken,
  });

  const refresh_token = new CognitoRefreshToken({
    RefreshToken: refreshToken,
  });

  let tokens = {
    IdToken: id_token,
    RefreshToken: refresh_token,
    AccessToken: access_token,
  };

  let session = new CognitoUserSession(tokens);
  const userData = {
    Username: email,
    Pool: userPool,
  };

  let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.signInUserSession = session;

  if (!session.isValid()) {
    let sessionErr = new Error("Invalid Session!");
    console.log(sessionErr);
  }

  cognitoUser.updateAttributes(
    [
      new CognitoUserAttribute({
        Name: attribute,
        Value: value,
      }),
    ],
    (err, result) => {
      if (err) {
        return console.log(err);
      }

      let response = {
        status: result,
      };

      return response;
    }
  );
}

module.exports = { updateJwt };
