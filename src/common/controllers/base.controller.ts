import { Response } from "express";
import { ApplicationException } from "../exceptions/application.exception";

export abstract class BaseController {
  handleException(error: any, res: Response) {
    if (error instanceof ApplicationException) {
      res.status(400).send();
    } else {
      throw new Error(error);
    }
  }
}
