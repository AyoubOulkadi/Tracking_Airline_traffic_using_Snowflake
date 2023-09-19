import { sendEmail } from "./sendEmail";

const sendPaymentSuccessEmail = async ({ email, name }) => {
  const html = `
    <h1>Bonjour Mme/Mr ${name}</h1>
    <p>Nous avons le plaisir de vous informer que votre achat sur notre site pantofit.ma a été effectué avec succès ! Vous pouvez désormais accéder à votre contenu personnalisé depuis la plateforme pantofit.ma et bénéficier de toutes nos offres.</p>
    <p>Nous tenons à vous remercier pour la confiance que vous nous accordez et pour avoir choisi notre plateforme pour votre achat.</p>
    <p>Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter via notre service clientèle, qui est à votre disposition pour répondre à toutes vos demandes.</p>
    <p>Encore une fois, merci pour votre achat sur pantofit.ma.</p>
    <p>Cordialement,</p>
    <p>L'équipe de pantofit.ma</p>
  `;

  return sendEmail({
    from: "contact@pantofit.ma",
    to: email,
    subject: "Confirmation de votre achat sur pantofit.ma",
    html,
  });
};

export default sendPaymentSuccessEmail;
