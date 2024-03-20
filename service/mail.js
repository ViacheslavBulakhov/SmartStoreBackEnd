const nodemailer = require('nodemailer');
const { ctrlWrapper } = require('../helpers');
const SalesCounter = require('../models/MongooseModels/count');
const Goods = require('../models/MongooseModels/goods');

const { ICLOUD_PASS, ICLOUD_LOGIN } = process.env;
const id = '65df35cfe64871cc53345c7c';

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
  const totalCalculate = req.body.buyingList.reduce(
    (acc, item) => {
      const totalCount = item?.buyCount ? acc[0] + item.buyCount : acc[0] + 1;
      const totalAmount = item?.buyCount
        ? acc[1] + item.amount * item.buyCount
        : acc[1] + item.amount;

      return [totalCount, totalAmount];
    },
    [0, 0]
  );
  const { delivery, payment, region, city, department, name, number, text } =
    req.body.user;

  const data = await SalesCounter.find({});

  const html = `
    <div>
      <h1>Замовлення №:${data[0].count}</h1>
        <h3>${name}</h3>
      <a href="tel: ${number}">${number}</a>
    
      <h2>Товарів  ${totalCalculate[0]} на суму ${totalCalculate[1]}грн</h2>

       <div>
    <p>
    Пошта: 
      <span>${delivery === 'nova-post' ? 'Нова Пошта' : 'Укр Пошта'}</span>
    </p>
    <p>
    Оплата: 
      <span>${
        payment === 'cash-on-delivery' ? 'Післяплата' : 'Плата Картою'
      } </span>
    </p>
    <p>
    Область: 
      <span>${region}</span>
    </p>
    <p>Місто: 
      <span>${city}</span>
    </p>
    <p>Відділення: 
      <span>${department}</span>
    </p>
    <p>Коментар: 
      <span>${text || 'Без коментарів'}</span>
    </p>
  </div>
      <ul>
        ${req.body.buyingList
          .map(
            item => `
          <li>
            <div>
              <h2>
                ${item.title}
              </h2>
              <img src=${item.imgUrl}
              alt=${item.title}
              width="100px"
              height="100px"/>
              <p>кількість ${item.buyCount || 1} од</p>
              <p>Вартість ${item.amount} ₴</p>
            </div>
          </li>
        `
          )
          .join('')}
      </ul>

    </div>
  `;

  const mailData = {
    to: 'dmytrotretiakov94@gmail.com',
    subject: 'New Guest',
    text: `Hello Test Mail`,

    html,
    from: 'SmartStoreUa@icloud.com',
  };

  await transporter.sendMail(mailData);

  await SalesCounter.findByIdAndUpdate(id, {
    count: data[0].count + 1,
  });

  res.status(200).json({ status: 'OK' });
};

const sendEmailAboutGoodsCount = async data => {
  try {
    if (
      data.operationType === 'update' &&
      data?.updateDescription?.updatedFields?.count
    ) {
      const id = data.documentKey._id.toString();
      console.log(id);
      const result = await Goods.find({});
      console.log(result);
      // const html = `
      //  <h1>Ваш товар вже в наявності відвідайте наш сайт для замовлення</h1>
      //       <h3>Назва товару</h3>
      //     <a >посилання</a>
      // `;
      // const mailData = {
      //   to: 'dmytrotretiakov94@gmail.com',
      //   subject: 'New Guest',
      //   text: `Hello Test Mail`,
      //   html,
      //   from: 'SmartStoreUa@icloud.com',
      // };
      // await transporter.sendMail(mailData);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendEmail: ctrlWrapper(sendEmail),
  sendEmailAboutGoodsCount,
};
