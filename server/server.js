require('dotenv').config();
const express = require('express');
const app = express();
const port = 5001;
const nodemailer = require('nodemailer'); // nodemailer
const loadHtmlTemplate = require('./emailTemplateLoader'); // Import the template loader function

// Email Configuration
const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const EMAIL_FROM = process.env.EMAIL_ACCOUNT;
const EMAIL_PW = process.env.EMAIL_PASSWORD;
const EMAIL_TO = process.env.EMAIL_TO;

async function sendEmail() {
  try {
    // Load the HTML template asynchronously
    const emailHtml = await loadHtmlTemplate('ca_ptl.html'); // Update with your template file name

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
      html: emailHtml, // Use the loaded HTML template
    };

    const info = await transporter.sendMail(mail_configs);
    console.log('Email sent: ' + info.response);
    return { message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('An error has occurred');
  }
}

app.get('/sendEmail', async (req, res) => {
  try {
    const response = await sendEmail();
    res.send(response.message);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Mailing Server is listening at PORT:${port}`);
});
