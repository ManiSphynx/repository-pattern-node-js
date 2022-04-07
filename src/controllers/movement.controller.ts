import { Request, Response } from "express";
import { GET, POST, route } from "awilix-express";
import { BaseController } from "../common/controllers/base.controller";
import { MovementService } from "../services/movement.service";
import { MovementCreateDto } from "../dtos/movement.dto";

@route("/movements")
export class MovementController extends BaseController {
  constructor(private readonly movementService: MovementService) {
    super();
  }
  @GET()
  public async all(request: Request, response: Response) {
    try {
      response.send(await this.movementService.all());
    } catch (error) {
      this.handleException(error, response);
    }
  }

  @route("/:id")
  @GET()
  public async find(request: Request, response: Response) {
    try {
      const id = parseInt(request.params.id);
      const result = await this.movementService.find(id);

      if (result) {
        response.send(result);
      } else {
        response.status(404).send();
      }
    } catch (error) {
      this.handleException(error, response);
    }
  }

  @POST()
  public async store(request: Request, response: Response) {
    try {
      await this.movementService.store({
        type: request.body.type,
        amount: request.body.amount,
        user_id: request.body.user_id,
      } as MovementCreateDto);
      response.send();
    } catch (error) {
      this.handleException(error, response);
    }
  }
}
