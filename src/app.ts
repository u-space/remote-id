import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";
import Config from "./utils/Configuration";
import { readFileSync } from "fs";
import https from "https";
import Configuration from "./utils/Configuration";
import JWTUtilsFactory from "./controllers/utils/jwt/JWTUtilsFactory";
import { v4 as uuidv4 } from "uuid";
import ConsoleUtils, { ConsoleColor } from "./utils/ConsoleUtils";
import { initialized } from "./data-source";

// const pathToSwaggerUi = require("swagger-ui-dist").absolutePath();

let auth_public_key = "";
const PORT = Config.PORT;
const app = express();
try {
  //middlewares
  app.use(cors());
  app.use(express.json());
  auth_public_key = readFileSync("./public.key", "utf8");
  app.use((req: Request, res: Response, next: NextFunction) => {
    consoleLogRequest(req);
    next();
  });
  app.use(
    JWTUtilsFactory.getJWTUtils(
      false,
      "",
      auth_public_key
    ).getCheckJWTFunction()
  );
  // }

  app.use(router);

  initialized.then(() => {
    // app listen using ssl
    https
      .createServer(
        {
          key: readFileSync(Configuration.SSL_KEY),
          cert: readFileSync(Configuration.SSL_CERT),
        },
        app
      )
      .listen(PORT, () => {
        console.log(`flight-request-api listening on port ${PORT}`);
      });
  });
} catch (error) {
  console.log(error);
}

function consoleLogRequest(req: Request): void {
  const reqId = uuidv4().substring(0, 4);
  const reqColor = getRequestColor(req);
  ConsoleUtils.print(`[REQUEST ${reqId}] ${req.method} ${req.url}`, reqColor);
  if (req.method === "POST") {
    ConsoleUtils.print(
      `[REQUEST ${reqId}] ${JSON.stringify(req.body)}`,
      reqColor
    );
  }
}

function getRequestColor(req: Request): ConsoleColor {
  if (req.method === "DELETE") return ConsoleColor.RED;
  else if (req.method === "GET") return ConsoleColor.GREEN;
  else if (req.method === "PATCH") return ConsoleColor.YELLOW;
  else if (req.method === "POST") {
    return ConsoleColor.BLUE;
  } else if (req.method === "PUT") return ConsoleColor.MAGENTA;
  return ConsoleColor.WHITE;
}
