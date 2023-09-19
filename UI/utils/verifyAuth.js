import { jwtVerify } from "jose";

export default async function verifyAuth(token) {
  try {
    const verifiedToken = await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return verifiedToken.payload;
  } catch (err) {
    throw new Error("invalid token");
  }
}
