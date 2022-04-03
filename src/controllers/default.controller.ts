import { Request, Response } from "express";
import { GET, route } from "awilix-express";

@route("/")
export class DefaultController {
  @GET()
  public index(request: Request, response: Response): void {
    response.send("Hello World");
  }
}
