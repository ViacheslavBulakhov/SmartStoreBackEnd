const nodemailer = require('nodemailer');
const { ctrlWrapper } = require('../helpers');

const SalesCounter = require('../models/MongooseModels/count');

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

  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const formattedDate = `${day < 10 ? '0' + day : day}.${
    month < 10 ? '0' + month : month
  }.${year}`;

  const html = `<table 
  border="1" 
  style="border-collapse:collapse;
	border-spacing:0;
  width:400px;
  margin-bottom: 20px;">

  <tr style="background-color: #efefef;border: none;">
    <th colspan="2">Деталізація замовлення</th>
  </tr>

  <tr style=" border: none;">
 
    <td style="border: none;"> <b>№ замовлення:</b> ${data[0].count}</td>
   
  </tr>
  <tr>
    <td style="border: none;"><b>Дата замовлення:</b>  ${formattedDate}</td>
  </tr>

   <tr>
    <td style="border: none;"><b>Телефон:</b> ${number}</td>
  </tr>
</table>

<table 
  border="1" 
  style="border-collapse:collapse;
	border-spacing:0;
  width:400px;
  margin-bottom: 20px;">

  <tr style="background-color: #efefef;border: none;">
    <th colspan="2">Дані для відправлення</th>
  </tr>

  <tr style=" border: none;">
    <td style="border: none;"> <b>Ім'я: </b> ${name}</td>
  </tr>
 

   <tr>
    <td style="border: none;"><b>Місто: </b> ${city}</td>
  </tr>

  <tr>
    <td style="border: none;"><b>Область: </b> ${region}</td>
  </tr>

   <tr>
    <td style="border: none;"> <b>Пошта:</b> ${
      delivery === 'nova-post' ? 'Нова Пошта' : 'Укр Пошта'
    } </td>
  </tr>

   <tr>
    <td style="border: none;"><b>№ Відділення: </b>  ${department}</td>
  </tr>

   <tr>
    <td style="border: none;"> <b>Спосіб оплати:</b>  ${
      payment === 'cash-on-delivery' ? 'Післяплата' : 'Плата Картою'
    }</td>
   
  </tr>
 
</table>

<table border="1" style="border-collapse:collapse;
	border-spacing:0; width:400px; margin-bottom: 20px;">
  <tr style="background-color: lightgray;">
    <th>Товар</th>
    <th>Модель</th>
    <th>Кількість</th>
    <th>Ціна</th>
    <th>Разом</th>
  </tr>

          ${req.body.buyingList
            .map(
              item => `
  <tr>
    <th> ${item.title}</th>
    <th>${item.model}</th>
    <th>${item.buyCount || 1}</th>
    <th>${item.amount}</th>
    <th>${item.buyCount * item.amount} грн</th>
  </tr>`
            )
            .join('')}

  <tr style="background-color: #efefef;border: none;">
  <th colspan="5">Разом: ${totalCalculate[1]} грн</th>
  </tr>
</table>


<table 
  border="1" 
  style="border-collapse:collapse;
	border-spacing:0;
  width:400px;
  margin-bottom: 20px;">

  <tr style="background-color: #efefef;border: none;">
    <th >Коментар від замовника</th>
  </tr>

  <tr style=" border: none;">
 
    <td style="border: none;"> <b>${text}</b> </td>
   
  </tr>
  
</table>


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
  await Promise.all(
    data.subscribers.map(async userMail => {
      const mailData = {
        to: userMail,
        subject: 'Notification',
        text: `Ваш товар "${data.title}" вже в наявності відвідайте наш сайт для замовлення https://smartstore.com.ua/`,
        from: 'SmartStoreUa@icloud.com',
      };
      await transporter.sendMail(mailData);
    })
  );
};

module.exports = {
  sendEmail: ctrlWrapper(sendEmail),
  sendEmailAboutGoodsCount: ctrlWrapper(sendEmailAboutGoodsCount),
};
