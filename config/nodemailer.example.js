const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'example@gmail.com',
    pass: 'example123',
  },
});

module.exports = transporter;
