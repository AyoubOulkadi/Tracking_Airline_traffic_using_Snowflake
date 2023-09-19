import { NextResponse } from "next/server";
import verifyAuth from "../utils/verifyAuth";
const { getCookies } = require("cookies-next");

export async function middleware(request) {
  
}
export const config = {
  matcher: [
    "/",
    
  ],
};
