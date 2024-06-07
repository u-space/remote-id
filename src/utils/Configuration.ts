import "dotenv/config";
import { LogsUtilsType, strToLogsUtilsType } from "./logs/LogsUtilsFactory";

// Way to access the environment variables
// if not allenvs variables are defined in .env file
// then show error message

class Configuration {
  private constructor() {
    // vefiry mandatory envs are defined
    const ENVS = [
      "PORT",
      "CIELUM_BACKEND",
      "DATABASE_URL",
      "FRONT_END_URL",
      "FRONT_END_URL_MOBILE",
      "FILES_PATH",
      "MOCK_MAIL_SERVICE",
      "MOCK_CIELUM_API",
      "MOCK_STRIPE_API",
      "BASE_PRICE",
      "URBAN_FLIGHT_CHARGE",
      "ADMIN_EMAIL",
    ];
    for (let i = 0; i < ENVS.length; i++) {
      const env = ENVS[i];
      if (!process.env[env]) {
        throw new Error(`Environment variable ${env} is not defined`);
      }
      // BASE_PRICE must be a natural number
      if (env === "BASE_PRICE" || env === "URBAN_FLIGHT_CHARGE") {
        const value = Number(process.env[env]).valueOf();
        if (!Number.isInteger(value) || value < 0) {
          throw new Error(
            `${process.env[env]} must be a natural number (${process.env[env]})`
          );
        }
      }
    }

    // if it is a production environment, or if MOCK_MAIL_SERVICE is not true, we check SMTP config is defined
    const productionEnvironment =
      process.env.NODE_ENV !== "dev" && process.env.NODE_ENV !== "test";
    const mockMailService = process.env["MOCK_MAIL_SERVICE"] === "true";
    if (productionEnvironment || !mockMailService) {
      const smptEnvVars = [
        "SMTP_PASSWORD",
        "SMTP_URL",
        "SMTP_USERNAME",
        "SMTP_PORT",
        "SMTP_SECURE",
      ];
      for (let i = 0; i < smptEnvVars.length; i++) {
        const env = smptEnvVars[i];
        if (!process.env[env]) {
          if (productionEnvironment) {
            throw new Error(
              `In production it is mandatory to define '${env}' in .env file`
            );
          } else {
            throw new Error(
              `If MOCK_MAIL_SERVICE !== true, it is mandatory to define '${env}' in .env file`
            );
          }
        }
      }
    }
  }

  static getInstance() {
    return new Configuration();
  }

  // We can safely cast as string because constructor will check the enviroments

  get PORT() {
    return process.env.PORT as string;
  }

  get CIELUM_BACKEND() {
    return process.env.CIELUM_BACKEND as string;
  }

  get DATABASE_URL() {
    return process.env.DATABASE_URL as string;
  }

  get FRONT_END_URL() {
    return process.env.FRONT_END_URL as string;
  }

  get FRONT_END_ASSETS() {
    return process.env.FRONT_END_ASSETS as string;
  }

  get FRONT_END_URL_MOBILE() {
    return process.env.FRONT_END_URL_MOBILE as string;
  }

  get FILES_PATH() {
    return process.env.FILES_PATH as string;
  }

  get SMTP_PASSWORD(): string {
    return process.env.SMTP_PASSWORD as string;
  }

  get SMTP_URL(): string {
    return process.env.SMTP_URL as string;
  }

  get SMTP_USERNAME(): string {
    return process.env.SMTP_USERNAME as string;
  }

  get SMTP_PORT(): number {
    return Number(process.env.SMTP_PORT);
  }

  get SMTP_SECURE(): boolean {
    return process.env.SMTP_SECURE === "true";
  }

  get MOCK_MAIL_SERVICE(): boolean {
    return process.env.MOCK_MAIL_SERVICE === "true";
  }

  get MOCK_JWT_VERIFICATION(): boolean {
    return process.env.MOCK_JWT_VERIFICATION === "true";
  }

  get JWT_USERNAME(): string {
    return process.env.JWT_USERNAME as string;
  }

  get MOCK_CIELUM_API(): boolean {
    return process.env.MOCK_CIELUM_API === "true";
  }

  get MOCK_STRIPE_API(): boolean {
    return process.env.MOCK_STRIPE_API === "true";
  }

  get STRIPE_SECRET_KEY(): string {
    return process.env.STRIPE_SECRET_KEY as string;
  }

  get CRONJOBS_DISABLED(): boolean {
    return process.env.CRONJOBS_DISABLED === "true";
  }

  get LOGS(): LogsUtilsType {
    return strToLogsUtilsType(process.env.LOGS as string);
  }

  get SSL_CERT(): string {
    return process.env.SSL_CERT as string;
  }

  get SSL_KEY(): string {
    return process.env.SSL_KEY as string;
  }

  get VEHICLE_DOCUMENT_TAGS_REQUIRED_TO_FLIGHT(): string[] {
    const strTagsRequired =
      process.env.VEHICLE_DOCUMENT_TAGS_REQUIRED_TO_FLIGHT;
    if (
      strTagsRequired === undefined ||
      strTagsRequired === null ||
      strTagsRequired === ""
    )
      return [];
    const tags = strTagsRequired.split(",");
    return tags.map((tag) => tag.trim());
  }

  get BASE_PRICE(): number {
    return Number(process.env.BASE_PRICE).valueOf();
  }

  get URBAN_FLIGHT_CHARGE(): number {
    return Number(process.env.URBAN_FLIGHT_CHARGE).valueOf();
  }

  get ADMIN_EMAIL(): string {
    return process.env.ADMIN_EMAIL as string;
  }
}

export default Configuration.getInstance();
