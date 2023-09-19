const jwt = require("jsonwebtoken");
const { setCookie } = require("cookies-next");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const isTokenValid = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

const attachCookiesToResponse = ({ req, res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } });
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

  const fifteenMinutes = 1000 * 60 * 15;
  const month = 1000 * 60 * 60 * 24 * 30;

  if (req.headers.host === "localhost:3000") {
    setCookie("accessToken", accessTokenJWT, {
      req,
      res,

      httpOnly: true,
      sameSite: true,
      secure: true,
      maxAge: new Date(Date.now() + fifteenMinutes),
    });

    setCookie("refreshToken", refreshTokenJWT, {
      req,
      res,

      httpOnly: true,
      sameSite: true,
      secure: true,
      maxAge: new Date(Date.now() + month),
    });
  } else {
    setCookie("accessToken", accessTokenJWT, {
      req,
      res,
      domain: ".kitchen-hub.vercel.app",
      httpOnly: true,
      sameSite: true,
      secure: true,
      maxAge: new Date(Date.now() + fifteenMinutes),
    });

    setCookie("refreshToken", refreshTokenJWT, {
      req,
      res,
      domain: ".kitchen-hub.vercel.app",
      httpOnly: true,
      sameSite: true,
      secure: true,
      maxAge: new Date(Date.now() + month),
    });
  }
};

module.exports = { attachCookiesToResponse, createJWT, isTokenValid };
