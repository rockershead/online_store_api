const { User } = require("../../models");
const { uuid } = require("uuidv4");
const { userPool, AmazonCognitoIdentity } = require("../../utils");
const { ROLES } = require("../../../library/Constants");

const registerWithCognito = () => async (req, res, next) => {
  const { email, password, name, contact, age } = req.body;

  var user = await User.findOne({ email: email });

  if (user) {
    res.status(400).send("This user already exists.");
  } else {
    const user = new User({
      email: email,
      confirmationStatus: false,
      name: name,
      contact: contact,
      age: age,
    });

    await user.save();

    var attributeList = [];
    attributeList.push(
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "name",
        Value: name,
      })
    );

    attributeList.push(
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "email",
        Value: email,
      })
    );
    attributeList.push(
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "phone_number",
        Value: contact,
      })
    );
    attributeList.push(
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "custom:role",
        Value: ROLES.CONSUMER,
      })
    );
    attributeList.push(
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "custom:subscribed",
        Value: 0,
      })
    );
    //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"updated_at",Value:updated_at}));
    //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:role",Value:role.toString()}));

    userPool.signUp(
      email,
      password,
      attributeList,
      null,
      function (err, result) {
        if (err) {
          res.status(400).send(err);
          return;
        }
        const cognitoUser = result.user;
        //console.log("user is " + JSON.stringify(cognitoUser);
        res.status(200).send(cognitoUser);
      }
    );
  }
};

module.exports = { registerWithCognito };
