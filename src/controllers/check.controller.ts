import { Request, Response } from "express";
import { GET, route } from "awilix-express";

@route("/check")
export class DefaultController {
  constructor() {}

  @GET()
  public index(request: Request, response: Response): void {
    response.send({
      NODE_ENV: process.env.NODE_ENV,
      APP_ENV: process.env.APP_ENV,
    });
  }
}
