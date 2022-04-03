import { Request, Response } from "express";
import { DELETE, GET, POST, PUT, route } from "awilix-express";
import { SubscriptionService } from "../services/subscripton.service";
import {
  SubscriptionCreateDto,
  SubscriptionUpdateDto,
} from "../dtos/subscription.dto";

@route("/subscriptions")
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}
  @GET()
  public async all(request: Request, response: Response) {
    response.send(await this.subscriptionService.all());
  }

  @route(":id")
  @GET()
  public async find(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    response.send(await this.subscriptionService.find(id));
  }

  @POST()
  public async store(request: Request, response: Response) {
    await this.subscriptionService.store({
      user_id: request.body.user_id,
      code: request.body.code,
      amount: request.body.amount,
      cron: request.body.cron,
    } as SubscriptionCreateDto);
    response.send();
  }

  @route(":id")
  @PUT()
  public async update(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    await this.subscriptionService.update(id, {
      code: request.body.code,
      amount: request.body.amount,
      cron: request.body.cron,
    } as SubscriptionUpdateDto);
    response.send();
  }

  @route(":id")
  @DELETE()
  public async remove(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    await this.subscriptionService.remove(id);
    response.send();
  }
}
