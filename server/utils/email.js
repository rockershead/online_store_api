const { SESv2Client, SendEmailCommand } = require("@aws-sdk/client-sesv2");
require("dotenv").config();

function getClient() {
  const client = new SESv2Client({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  return client;
}

async function sendEmailWithSES(fromEmail, toEmails, subject, body) {
  const input = {
    Content: {
      Simple: {
        Subject: {
          Data: subject,
        },
        Body: {
          Text: {
            Data: body,
          },
        },
      },
    },

    Destination: {
      ToAddresses: toEmails,
    },
    FromEmailAddress: fromEmail,
  };

  const client = getClient();
  const command = new SendEmailCommand(input);

  await client.send(command);
  console.log("email sent successfully");
}

async function sendEmail(toEmails, subject, body) {
  const FROM_EMAIL = process.env.AWS_SYS_EMAIL;

  await sendEmailWithSES(FROM_EMAIL, toEmails, subject, body);
}

//sendEmail(
//["zahir@pyloncity.com"],
//"Successful Transaction",
//"You have successfully made a purchase"
//);

module.exports = { sendEmail };
