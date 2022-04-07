import { MovementType } from "../common/enums/movement-type";
import { ApplicationException } from "../common/exceptions/application.exception";
import { MovementCreateDto } from "../dtos/movement.dto";
import { Balance } from "./repositories/domain/balance";
import { Movement } from "./repositories/domain/movement";
import { BalanceInterface } from "./repositories/interfaces/balance.interface";
import { MovementInteface } from "./repositories/interfaces/movement.interface";

export class MovementService {
  constructor(
    private readonly movementRepository: MovementInteface,
    private readonly balanceRepository: BalanceInterface
  ) {}

  /* TODO: refactor this */
  async find(id: number): Promise<Movement | null> {
    return await this.movementRepository.find(id);
  }

  async all(): Promise<Movement[]> {
    return await this.movementRepository.all();
  }

  async store(entry: MovementCreateDto): Promise<void> {
    const balance = await this.balanceRepository.findByUserId(entry.user_id);

    if (entry.type === MovementType.INCOME) {
      await this.income(entry, balance);
    } else if (entry.type === MovementType.OUTCOME) {
      await this.outcome(entry, balance);
    } else {
      throw new ApplicationException("Invalid movement type");
    }
  }

  private async income(entry: MovementCreateDto, balance: Balance | null) {
    if (!balance) {
      await this.balanceRepository.store({
        amount: entry.amount,
        user_id: entry.user_id,
      } as Balance);
    } else {
      balance.amount += entry.amount;
      await this.balanceRepository.update(balance);
    }

    /* TODO: refactor this */
    await this.movementRepository.store(entry as Movement);
  }

  private async outcome(entry: MovementCreateDto, balance: Balance | null) {
    if (!balance || balance.amount < entry.amount) {
      throw new ApplicationException("Insufficient funds");
    } else {
      balance.amount -= entry.amount;
      await this.balanceRepository.update(balance);

      /* TODO: refactor this */
      await this.movementRepository.store(entry as Movement);
    }
  }
}
