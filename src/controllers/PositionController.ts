import { Request, Response } from "express";
import { PositionService } from "../services/PositionService";
import { IPositionPostRequest } from "./IPositionPostRequest";
import ErrorUtils from "./utils/errorUtils";
import { getTokenPayload } from "./utils/jwt/util";

export class PositionController {
  private positionService = new PositionService();

  postPositionRequest = async (req: Request, res: Response) => {
    let token: string;

    try {
      const iPosition: IPositionPostRequest = req.body;
      token = iPosition.authentication_data;

      if (token === undefined) {
        return ErrorUtils.respond4XX(res, 401, "Unauthorized");
      }

      const { username } = getTokenPayload(token);

      if (username === undefined) {
        return ErrorUtils.respond4XX(res, 401, "Unauthorized");
      }

      const positions = await this.positionService.addPosition(iPosition, username);
      res.status(200).send(positions);
    } catch (error) {
      console.log("Error: ", error);
      return ErrorUtils.respond4XX(res, 400, (error as Error).message);
    }
  };

  getPositionRequest = async (req: Request, res: Response) => {
    try {
      const positions = await this.positionService.getPositions();
      res.status(200).send(positions);
    } catch (error) {
      console.log("Error: ", error);
      return ErrorUtils.respond4XX(res, 400, (error as Error).message);
    }
  };

  getLastPosition = async (req: Request, res: Response) => {
    try {
      const positions = await this.positionService.getLastPosition();
      res.status(200).send(positions[0]);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  getPositionAfterIdRequest = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return ErrorUtils.respond4XX(
          res,
          400,
          "Missing required parameter: id"
        );
      }
      const positions = await this.positionService.getPositionsAfterId(+id);
      res.status(200).send(positions);
    } catch (error) {
      console.log("Error: ", error);
      return ErrorUtils.respond4XX(res, 400, (error as Error).message);

    }
  };

  getPositionsBetweenDates = async (req: Request, res: Response) => {
    try {
      const { startDate, endDate } = req.params;
      const positions = await this.positionService.getPositionsBetweenDates(
        new Date(startDate),
        new Date(endDate)
      );
      res.status(200).send(positions);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  getPositionsByOperationId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return ErrorUtils.respond4XX(
          res,
          400,
          "Missing required parameter: id"
        );
      }

      const positions = await this.positionService.getPositionsByOperationId(
        id
      );
      res.status(200).send(positions);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  getPositionsByOperationIdWithDates = async (req: Request, res: Response) => {
    try {
      const { gufi, time_start, time_end } = req.query as {
        [key: string]: string;
      };
      const operationId = gufi;

      if (!operationId) {
        return ErrorUtils.respond4XX(
          res,
          400,
          "Missing required parameter: operationId"
        );
      }

      const positions =
        await this.positionService.getPositionsByOperationIdWithDates(
          operationId,
          new Date(time_start),
          new Date(time_end)
        );
      res.status(200).send(positions);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
}
