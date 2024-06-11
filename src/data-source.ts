import "reflect-metadata";
import { DataSource } from "typeorm";
import Configuration from "./utils/Configuration";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: Configuration.DATABASE_HOST,
  port: Configuration.DATABASE_PORT,
  username: Configuration.DATABASE_USERNAME,
  password: Configuration.DATABASE_PASSWORD,
  database: Configuration.DATABASE_DATABASE,
  synchronize: true,
  logging: false,
  entities: [__dirname + "/entities/*{.js,.ts}"],
  migrations: [],
  subscribers: [],
});
