require('dotenv').config();
const express = require('express');
const app = express();
const port = 5001;
const nodemailer = require('nodemailer'); // nodemailer

// Email Configuration
const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const EMAIL_FROM = process.env.EMAIL_ACCOUNT;
const EMAIL_PW = process.env.EMAIL_PASSWORD;
const EMAIL_TO = process.env.EMAIL_TO;

function sendEmail() {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_FROM,
        pass: EMAIL_PW,
      },
    });
    // send the email
    const mail_configs = {
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: 'Testing Sending Email',
      text: 'Just checking if this email will be sent.',
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: `Email sent successfully` });
    });
  });
}

app.get('/', (req, res) => {
  sendEmail()
    .then(response => res.send(response.message))
    .catch(error => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`Mailing Server is listening at PORT:${port}`);
});
