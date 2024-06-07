import { Request, Response } from "express";
import { isString, isUndefined } from "lodash";

export const handleSendList = (
  req: Request,
  res: Response,
  list: any[]
): void => {
  res.status(200).json(list);
};

export const handleSendObject = (
  req: Request,
  res: Response,
  object: any
): void => {
  res.status(200).json(object);
};

export const handleSendOk = (req: Request, res: Response): void => {
  res.status(204).send();
};

export const getTokenFromRequest = (req: Request): string => {
  if (isString(req.headers["Authorization"]))
    return removeBearerFromToken(req.headers["Authorization"]);
  if (isString(req.headers["authorization"]))
    return removeBearerFromToken(req.headers["authorization"]);
  if (isString(req.headers["auth"]))
    return removeBearerFromToken(req.headers["auth"]);
  throw new Error("no token received");
};

function removeBearerFromToken(token: string): string {
  return token.startsWith("Bearer ") ? token.substring(7) : token;
}
