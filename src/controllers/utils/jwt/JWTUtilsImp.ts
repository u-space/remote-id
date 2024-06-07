import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import IJWTUtils from "./IJWTUtils";

const ALGORITHM = "RS256";

export default class JWTUtilsImp implements IJWTUtils {
  publicKey: string;
  constructor(publicKey: string) {
    this.publicKey = publicKey;
  }
  getCheckJWTFunction(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void {
    return (req: Request, res: Response, next: NextFunction) => {
      //Get the jwt token from the head
      const token: string =
        (req.headers.authorization as string) || (req.headers.auth as string);
      const compliantToken = token?.replace("Bearer ", "");
      let jwtPayload;
      if (!token || !compliantToken) {
        res.status(401).send();
        return;
      }
      //Try to validate the token and get data
      try {
        jwtPayload = verify(compliantToken, this.publicKey, {
          algorithms: [ALGORITHM],
        });
        res.locals.jwtPayload = jwtPayload;
      } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        console.log(`Token error ${error}`);
        res.status(401).send();
        return;
      }

      //Call the next middleware or controller
      next();
    };
  }
}
