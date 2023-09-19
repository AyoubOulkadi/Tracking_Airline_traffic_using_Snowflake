import { sendEmail } from "./sendEmail";

const sendResetPasswordEmail = async ({ email, name, token, origin }) => {
  const html = `
    <h1>Bonjour ${name}</h1>
    <p>Nous avons bien reçu votre demande de réinitialisation de mot de passe pour votre compte . Nous comprenons que perdre ou oublier un mot de passe peut être frustrant, mais soyez assuré(e) que nous sommes là pour vous aider.</p>
    <p>Vous pouvez réinitialiser votre mot de passe en cliquant sur le bouton ci-dessous.</p>
    

    <a href="${origin}/reset-password/?token=${token}&email=${email}">

    <p>Cordialement,</p>
  `;

  return sendEmail({
    from: "contact@pantofit.ma",
    to: email,
    subject: "Reset Password",
    html,
  });
};

export default sendResetPasswordEmail;
