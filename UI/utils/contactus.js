const sendEmail = require("./sendEmail");

const contactus = async ({ email, name, message }) => {
  const html = `
    <h1>name ${name}</h1>
    <h1>email ${email}</h1>
    <p>${message}</p>
  `;

  return sendEmail({
    from: process.env.USER,
    to: "goinhub@gmail.com",
    subject: "contactus",
    html,
  });
};

module.exports = contactus;
