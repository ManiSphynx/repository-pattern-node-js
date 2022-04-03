import * as dotenv from "dotenv";
import express from "express";

/* Importaciones de inyección de dependencia */
import { loadControllers } from "awilix-express";
import loadContainer from "./container";

/* Definición de entorno de ejecución */
process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.APP_ENV = process.env.APP_ENV || "development";

dotenv.config({ path: `${__dirname}/../config/${process.env.APP_ENV}.env` });

const app: express.Application = express();

/* Cargador del Container */
loadContainer(app);

/* Definición de cotrollers */
app.use(loadControllers("controllers/*.ts", { cwd: __dirname }));

export { app };
