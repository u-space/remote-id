import { NextFunction, Request, Response } from "express";

export default interface IJWTUtils {
  getCheckJWTFunction(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
