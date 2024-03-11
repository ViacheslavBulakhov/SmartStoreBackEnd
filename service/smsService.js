// const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } =
//   process.env;

// const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// const smsService = async () => {
//   await client.messages
//     .create({
//       body: 'Ваш товар вже доступний',
//       from: TWILIO_PHONE_NUMBER,
//       to: '+380990498153',
//     })
//     .then(message => console.log(message));
// };

// module.exports = smsService;
