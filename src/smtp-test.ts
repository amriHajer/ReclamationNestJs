// smtp-test.ts

import * as nodemailer from 'nodemailer';

async function testSMTPConfiguration() {
  // Configure the transporter (SMTP) for sending emails
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP server host
    port: 587, // Replace with your SMTP server port
    secure: false, // Set to true if your SMTP server uses SSL
    auth: {
      user: 'yessmine.gsouri@esprit.tnm', // Replace with your email address
      pass: '223AFT1624', // Replace with your email password
    },
  });

  // Set the email options
  const mailOptions = {
    from: 'yessmine.gsouri@esprit.tn', // Replace with your email address
    to: 'hajer.amri93@gmail.com', // Replace with the recipient's email address
    subject: 'Test Email',
    html: '<p>Hello, this is a test email!</p>',
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Execute the function
testSMTPConfiguration();
