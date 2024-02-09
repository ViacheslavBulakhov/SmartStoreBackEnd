const nodemailer = require('nodemailer');
const { ctrlWrapper } = require('../helpers');

const { ICLOUD_PASS, ICLOUD_LOGIN } = process.env;

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.me.com',
  port: 587,
  auth: {
    user: ICLOUD_LOGIN,
    pass: ICLOUD_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

const sendEmail = async (req, res) => {
  const {
    title = 'Title',
    count = 'count',
    amount = 'amount',
    img = '',
  } = req.body;

  const html = `<div>
            <h1> Нове Замовлення №10</h2>
        <ul>
          <li>
           <img src=${img} width="100px" height="100px">
            <div>
              <h2>
                <a href="">${title}</a>
              </h2>
              <p>кількість ${count} од</p>
              <p>Вартість ${amount} ₴</p>
            </div>
          </li>
        </ul>
      </div>`;

  const mailData = {
    to: 'dmytrotretiakov94@gmail.com',
    subject: 'New Guest',
    text: `Hello Test Mail`,

    html,
    from: 'SmartStoreUa@icloud.com',
  };

  try {
    await transporter.sendMail(mailData);
    console.log('Email sent successfully');
    res.status(200).json({ status: 'OK' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { sendEmail: ctrlWrapper(sendEmail) };
