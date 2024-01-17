const { userPool, AmazonCognitoIdentity } = require("../../utils");

const logout = () => async (req, res, next) => {
  const { email } = req.body;

  var userData = {
    Username: email,
    Pool: userPool,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  
  const result = cognitoUser.signOut();
  res.status(200).send("logged out");
};

module.exports = { logout };
