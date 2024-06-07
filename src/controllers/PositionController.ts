import { Request, Response } from "express";
import { isUndefined } from "lodash";
import PaginatedResponse from "../daos/responses/PaginatedResponse";
import { InvalidDataError } from "../errors/InvalidDataError";
import { FlightRequest, FlightRequestState } from "../models/FlightRequest";
import { PositionService } from "../services/PositionService";
import Configuration from "../utils/Configuration";
import {
  convertAnyToFlightRequest,
  getPaginationParametersFromRequestQuery,
} from "./utils/convertUtils";
import ErrorUtils from "./utils/errorUtils";
import { getTokenFromRequest, handleSendOk } from "./utils/expressUtils";
import { IPositionPostRequest } from "../entities/IPositionPostRequest";
import { getTokenPayload } from "./utils/jwt/util";

class PositionController {
  private flightRequestService = new PositionService();

  postPositionRequest = async (req: Request, res: Response) => {
    let token: string;

    const IPosition: IPositionPostRequest = req.body;
    token = IPosition.authentication_data;

    if (token === undefined) {
      return ErrorUtils.respond4XX(res, 401, "Unauthorized");
    }

    const payload = getTokenPayload(token);
  };

  postFlightRequestPay = async (req: Request, res: Response) => {
    // get access token
    let token: string;
    try {
      token = getTokenFromRequest(req);
    } catch (error) {
      return ErrorUtils.respond4XX(res, 401, "Unauthorized");
    }

    // get request params
    const flightRequestId = req.params.id;
    const mobileClient = req.query.mobileClient === "true" ? true : false;

    // get pay link
    try {
      const payLink = await this.flightRequestService.payFlightRequest(
        flightRequestId,
        mobileClient
      );
      ErrorUtils.respond2XX(res, 200, payLink);
    } catch (error) {
      console.log(error);
      ErrorUtils.handleError(res, error);
    }
  };

  getFlightRequests = async (req: Request, res: Response) => {
    try {
      let injectBasePrice: boolean = false;
      try {
        injectBasePrice =
          req.query.injectBasePrice?.toString().toUpperCase() === "TRUE";
      } catch (error) {}
      let injectUrbanFlightCharge: boolean = false;
      try {
        injectUrbanFlightCharge =
          req.query.injectUrbanFlightCharge?.toString().toUpperCase() ===
          "TRUE";
      } catch (error) {}

      const { role, username } = res.locals.jwtPayload;
      let creatorUsername: string | undefined = undefined;
      if (role !== "ADMIN") creatorUsername = username;

      const { take, skip, filterBy, filter, orderBy, order } =
        getPaginationParametersFromRequestQuery(req.query);

      const paid = req.query.paid?.toString().toUpperCase() === "TRUE";
      const unpaid = req.query.unpaid?.toString().toUpperCase() === "TRUE";
      const filterState = req.query.filterState as
        | FlightRequestState
        | undefined;

      const flightRequest: PaginatedResponse<FlightRequest> =
        await this.flightRequestService.getFlightRequests(
          injectBasePrice,
          injectUrbanFlightCharge,
          creatorUsername,
          take,
          skip,
          filterBy,
          filter,
          orderBy,
          order,
          paid,
          unpaid,
          filterState
        );
      ErrorUtils.respond2XX(res, 200, {
        flightRequests: flightRequest.data,
        count: flightRequest.count,
      });
    } catch (error) {
      console.log(error);
      ErrorUtils.handleError(res, error);
    }
  };

  getFlightRequest = async (req: Request, res: Response) => {
    try {
      let injectVehicles: boolean = false;
      try {
        injectVehicles =
          req.query.injectVehicles?.toString().toUpperCase() === "TRUE";
      } catch (error) {}
      let token: string | undefined;
      if (injectVehicles) {
        try {
          token = getTokenFromRequest(req);
        } catch (error) {
          return ErrorUtils.respond4XX(res, 401, "Unauthorized");
        }
      }
      let injectCoordinators: boolean = false;
      try {
        injectCoordinators =
          req.query.injectCoordinators?.toString().toUpperCase() === "TRUE";
      } catch (error) {}
      let injectBasePrice: boolean = false;
      try {
        injectBasePrice =
          req.query.injectBasePrice?.toString().toUpperCase() === "TRUE";
      } catch (error) {}
      let injectUrbanFlightCharge: boolean = false;
      try {
        injectUrbanFlightCharge =
          req.query.injectUrbanFlightCharge?.toString().toUpperCase() ===
          "TRUE";
      } catch (error) {}
      const flightRequestId: string = req.params.id;
      const flightRequest: FlightRequest =
        await this.flightRequestService.getFlightRequest(
          flightRequestId,
          injectVehicles,
          injectCoordinators,
          token
        );
      if (injectBasePrice) flightRequest.basePrice = Configuration.BASE_PRICE;
      if (injectUrbanFlightCharge)
        flightRequest.urbanFlightCharge = Configuration.URBAN_FLIGHT_CHARGE;
      ErrorUtils.respond2XX(res, 200, flightRequest);
    } catch (error) {
      ErrorUtils.handleError(res, error);
    }
  };

  postFlightRequest = async (req: Request, res: Response) => {
    let token: string;
    try {
      token = getTokenFromRequest(req);
    } catch (error) {
      return ErrorUtils.respond4XX(res, 401, "Unauthorized");
    }
    const includePaymentLink =
      `${req.query.includePaymentLink}`.toLowerCase() === "true";
    try {
      const { username } = res.locals.jwtPayload;
      let flightRequest: FlightRequest;
      if (isUndefined(req.body.paid)) req.body.paid = false;
      if (isUndefined(req.body.state)) req.body.state = "PENDING";
      req.body.creator = { username };
      try {
        flightRequest = convertAnyToFlightRequest(req.body);
      } catch (error) {
        throw new InvalidDataError((error as Error).message);
      }
      const mobileClient = req.body.mobileClient === true ? true : false;
      const result = await this.flightRequestService.addFlightRequest(
        flightRequest,
        token,
        includePaymentLink,
        mobileClient
      );
      ErrorUtils.respond2XX(res, 200, result);
    } catch (error) {
      console.log(error);
      ErrorUtils.handleError(res, error);
    }
  };

  patchFlightRequestChangeState = async (req: Request, res: Response) => {
    let token: string;
    try {
      token = getTokenFromRequest(req);
    } catch (error) {
      return ErrorUtils.respond4XX(res, 401, "Unauthorized");
    }
    try {
      const flightRequestId: string = req.params.id;
      const { username } = res.locals.jwtPayload;
      const state: FlightRequestState = req.body.state;
      if (!state)
        throw new InvalidDataError(`invalid state received (state=${state})`);

      await this.flightRequestService.changeState(
        flightRequestId,
        state,
        username,
        token
      );
      handleSendOk(req, res);
    } catch (error) {
      ErrorUtils.handleError(res, error);
    }
  };

  postFlightRequestFinalize = async (req: Request, res: Response) => {
    let token: string;
    try {
      token = getTokenFromRequest(req);
    } catch (error) {
      return ErrorUtils.respond4XX(res, 401, "Unauthorized");
    }
    try {
      const { username } = res.locals.jwtPayload;
      const flightRequestId: string = req.params.id;
      const sessionId = req.body.sessionId;

      const fr = await this.flightRequestService.finalize(
        username,
        sessionId,
        token
      );
      ErrorUtils.respond2XX(res, 200, fr);
    } catch (error) {
      ErrorUtils.handleError(res, error);
    }
  };

  putFlightRequest = async (req: Request, res: Response) => {
    try {
      // return 501
      ErrorUtils.respond5XX(res, 501);
    } catch (error) {
      console.log(error);
      ErrorUtils.handleError(res, error);
    }
  };

  deleteFlightRequest = async (req: Request, res: Response): Promise<void> => {
    try {
      const { role, username } = res.locals.jwtPayload;
      const flightRequestId = req.params.id;
      if (!flightRequestId) ErrorUtils.respond4XX(res, 404, "Not Found");
      await this.flightRequestService.deleteFlightRequest(
        role,
        username,
        flightRequestId
      );
      ErrorUtils.respond2XX(res, 200, null);
    } catch (error) {
      ErrorUtils.handleError(res, error);
    }
  };
}

export default PositionController;
