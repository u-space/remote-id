import { verify } from "jsonwebtoken";
import { readFileSync } from "fs";
const ALGORITHM = "RS256";

const AUTH_PUBLIC_KEY = readFileSync("./public.key", "utf8");

interface ITokenPayload {
  username: string;
}

export const getTokenPayload = (token: string): ITokenPayload => {
  let jwtPayload;
  try {
    jwtPayload = verify(token, AUTH_PUBLIC_KEY, {
      algorithms: [ALGORITHM],
    });
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    console.log(`Token error ${error}`);
    return;
  }
  return jwtPayload as ITokenPayload;
};
