import express from "express";
import { createContainer, asClass } from "awilix";
import { scopePerRequest } from "awilix-express";
import { SubcriptionMySQLRepository } from "./services/repositories/impl/mysql/subscription.repository";
import { SubscriptionService } from "./services/subscripton.service";

export default (app: express.Application) => {
  const container = createContainer({
    injectionMode: "CLASSIC",
  });

  container.register({
    //repositories
    subscriptionRepository: asClass(SubcriptionMySQLRepository).scoped(),

    //services
    subscriptionService: asClass(SubscriptionService).scoped(),
  });

  app.use(scopePerRequest(container));
};
