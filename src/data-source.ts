import "reflect-metadata";
import { DataSource } from "typeorm";
import Configuration from "./utils/Configuration";
import { Position } from "./entities/position";

const entitiesPath = __dirname + "/entities/*{.js,.ts}";
console.log(entitiesPath);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: Configuration.DATABASE_HOST,
  port: Configuration.DATABASE_PORT,
  username: Configuration.DATABASE_USERNAME,
  password: Configuration.DATABASE_PASSWORD,
  database: Configuration.DATABASE_DATABASE,
  synchronize: true,
  dropSchema: true,
  logging: false,
  entities: [Position],
  // entities: [__dirname + "./src/entities/*{.js,.ts}"],
  migrations: [],
  subscribers: [],
  ssl: true,
});

export const initialized = AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
