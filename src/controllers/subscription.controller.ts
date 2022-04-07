import { Request, Response } from "express";
import { DELETE, GET, POST, PUT, route } from "awilix-express";
import { SubscriptionService } from "../services/subscripton.service";
import {
  SubscriptionCreateDto,
  SubscriptionUpdateDto,
} from "../dtos/subscription.dto";
import { BaseController } from "../common/controllers/base.controller";

@route("/subscriptions")
export class SubscriptionController extends BaseController {
  constructor(private readonly subscriptionService: SubscriptionService) {
    super();
  }
  @GET()
  public async all(request: Request, response: Response) {
    try {
      response.send(await this.subscriptionService.all());
    } catch (error) {
      this.handleException(error, response);
    }
  }

  @route("/:id")
  @GET()
  public async find(request: Request, response: Response) {
    try {
      const id = parseInt(request.params.id);
      const result = await this.subscriptionService.find(id);

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
      await this.subscriptionService.store({
        user_id: request.body.user_id,
        code: request.body.code,
        amount: request.body.amount,
        cron: request.body.cron,
      } as SubscriptionCreateDto);
      response.send();
    } catch (error) {
      this.handleException(error, response);
    }
  }

  @route("/:id")
  @PUT()
  public async update(request: Request, response: Response) {
    try {
      const id = parseInt(request.params.id);
      await this.subscriptionService.update(id, {
        code: request.body.code,
        amount: request.body.amount,
        cron: request.body.cron,
      } as SubscriptionUpdateDto);
      response.send();
    } catch (error) {
      this.handleException(error, response);
    }
  }

  @route("/:id")
  @DELETE()
  public async remove(request: Request, response: Response) {
    try {
      const id = parseInt(request.params.id);
      await this.subscriptionService.remove(id);
      response.send();
    } catch (error) {
      this.handleException(error, response);
    }
  }
}
