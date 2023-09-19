const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ from, to, subject, html }) => {
  const msg = {
    to, // Change to your recipient
    from, // Change to your verified sender
    subject,
    text: "pantofit",
    html,
  };
  console.log("msg", msg);
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  sendEmail,
};
