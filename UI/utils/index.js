const createTokenUser = require("./createTokenUser");
const contactus = require("./contactus");
const sendVerificationEmail = require("./sendVerificationEmail");
const sendResetPasswordEmail = require("./sendResetPasswordEmail").default;
const { createJwt, isTokenValid, attachCookiesToResponse } = require("./jwt");
const createHash = require("./createHash");

module.exports = {
  createJwt,
  contactus,
  createTokenUser,
  sendVerificationEmail,
  isTokenValid,
  attachCookiesToResponse,
  sendResetPasswordEmail,
  createHash,
};
