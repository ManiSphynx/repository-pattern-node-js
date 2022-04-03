import * as express from "express";

const app: express.Application = express();

app.get("/", (request: express.Request, response: express.Response) => {
  response.send("hello 2");
});

export { app };
