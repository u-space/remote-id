import { NextFunction, Request, Response } from "express";
import IJWTUtils from "./IJWTUtils";

export default class JWTUtilsMock implements IJWTUtils {
  username: string;

  constructor(username: string) {
    this.username = username;
  }
  getCheckJWTFunction(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void {
    return (req: Request, res: Response, next: NextFunction) => {
      res.locals.jwtPayload = { username: this.username };
      next();
    };
  }
}
