const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  email,
  name,
  verificationToken,
  origin,
}) => {
  const html = `
    <h1>Hello ${name}</h1>
    <p>Please verify your email by clicking <a href="${origin}/verify-email?token=${verificationToken}&email=${email}">here</a></p>
  `;

  return sendEmail({
    from: process.env.USER,
    to: email,
    subject: "Please verify your email",
    html,
  });
};

module.exports = sendVerificationEmail;
