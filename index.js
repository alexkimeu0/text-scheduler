const cron = require("node-cron");
require("dotenv").config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const messages = require("./messages");

let currentMessage = 0;

function sendTxt() {
  client.messages
    .create({
      body: messages[currentMessage],
      from: process.env.FROM,
      to: process.env.TO,
    })
    .then((message) => {
      currentMessage++;
      console.log(message);
    });
}

cron.schedule("* * * * *", () => {
  console.log("Message Sent!");
  sendTxt();
});
