import { Request, Response } from "express";
import { PositionService } from "../services/PositionService";
import { IPositionPostRequest } from "./IPositionPostRequest";
import ErrorUtils from "./utils/errorUtils";
import { getTokenPayload } from "./utils/jwt/util";

export class PositionController {
  private positionService = new PositionService();

  postPositionRequest = async (req: Request, res: Response) => {
    let token: string;

    const iPosition: IPositionPostRequest = req.body;
    token = iPosition.authentication_data;

    if (token === undefined) {
      return ErrorUtils.respond4XX(res, 401, "Unauthorized");
    }

    const { username } = getTokenPayload(token);

    try {
      this.positionService.addPosition(iPosition, username);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
}
