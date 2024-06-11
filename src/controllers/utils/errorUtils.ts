import { Response } from "express";
import { InvalidDataError } from "../../errors/InvalidDataError";
import { NoDataError } from "../../errors/NoDataError";
import Configuration from "../../utils/Configuration";
import LogLevel from "../../utils/logs/LogLevel";
import LogsUtilsFactory, {
  LogsUtilsType,
} from "../../utils/logs/LogsUtilsFactory";

export default class ErrorUtils {
  static logsUtils = LogsUtilsFactory.getLogsUtils(LogsUtilsType.CONSOLE);

  static respond(
    response: Response,
    statusCode: number,
    message: string | null,
    responseBody: any,
    respondRawString?: boolean
  ) {
    if (message !== null && responseBody !== null) {
      throw `Message and responseBody can't both be filled [message=${message}, responseBody=${responseBody}]`;
    }
    let responseBodyToLog = {
      ...responseBody,
    };
    if (message !== null) {
      responseBodyToLog = { message };
    }

    if (message !== null) {
      ErrorUtils.logsUtils.logLine(LogLevel.INFO, `${statusCode}`);
      if (respondRawString) {
        response.status(statusCode).send(message);
      } else {
        response.status(statusCode).json({ message });
      }
    } else if (responseBody !== null) {
      ErrorUtils.logsUtils.logLine(LogLevel.INFO, `${statusCode}`);
      response.status(statusCode).json(responseBody);
    } else {
      ErrorUtils.logsUtils.logLine(LogLevel.INFO, `${statusCode}`);
      response.status(statusCode).send();
    }
  }

  static respond2XX(
    res: Response,
    status: number,
    body: Record<string, any> | string | null
  ) {
    if (status < 200 || status >= 300) {
      throw `Invalid status code [status=${status}]`;
    }
    if (typeof body === "string") {
      ErrorUtils.respond(res, status, body, null, true);
    } else {
      ErrorUtils.respond(res, status, null, body);
    }
  }

  static respond4XX(res: Response, status: number, message: string) {
    if (status < 400 || status >= 500) {
      throw `Invalid status code [status=${status}]`;
    }
    ErrorUtils.respond(res, status, message, null);
  }

  static respond5XX(res: Response, status: number) {
    if (status < 500 || status >= 600) {
      throw `Invalid status code [status=${status}]`;
    }
    ErrorUtils.respond(res, status, null, null);
  }

  static handleError(res: Response, error: any): void {
    console.error("Error: ", error);
    if (error instanceof NoDataError) {
      return ErrorUtils.respond4XX(res, 404, (error as NoDataError).message);
    } else if (error instanceof InvalidDataError) {
      return ErrorUtils.respond4XX(
        res,
        400,
        (error as InvalidDataError).message
      );
    }
    res.sendStatus(500);
  }
}
