import { MySqlPool } from "../../../../common/persistence/mysql.persistence";
import { Balance } from "../../domain/balance";
import { BalanceInterface } from "../../interfaces/balance.interface";

export class BalanceMysqlRepository implements BalanceInterface {
  mysqlPool: MySqlPool;

  constructor() {
    this.mysqlPool = new MySqlPool();
  }

  public async find(id: number): Promise<Balance | null> {
    const [rows]: any[] = await this.mysqlPool
      .createMySqlPool()
      .promise()
      .execute("SELECT * FROM wallet_balance WHERE id = ?", [id]);

    if (rows.length) {
      return rows[0];
    }

    return null;
  }

  public async findByUserId(userId: number): Promise<Balance | null> {
    const [rows]: any[] = await this.mysqlPool
      .createMySqlPool()
      .promise()
      .execute("SELECT * FROM wallet_balance WHERE user_id = ?", [userId]);

    if (rows.length) {
      return rows[0];
    }

    return null;
  }

  public async all(): Promise<Balance[]> {
    const [rows]: any[] = await this.mysqlPool
      .createMySqlPool()
      .promise()
      .execute("SELECT * FROM wallet_balance ORDER BY id DESC");

    return rows as Balance[];
  }

  public async store(entry: Balance): Promise<void> {
    const now = new Date();

    await this.mysqlPool
      .createMySqlPool()
      .promise()
      .execute(
        "INSERT INTO wallet_balance(user_id, amount, created_at) VALUES(?, ?, ?)",
        [entry.user_id, entry.amount, now]
      );
  }

  public async update(entry: Balance): Promise<void> {
    const now = new Date();

    await this.mysqlPool
      .createMySqlPool()
      .promise()
      .execute(
        "UPDATE wallet_balance SET user_id = ?, amount = ?, updated_at = ? WHERE id = ?",
        [entry.user_id, entry.amount, now, entry.id]
      );
  }

  public async remove(id: number): Promise<void> {
    await this.mysqlPool
      .createMySqlPool()
      .promise()
      .execute("DELETE FROM wallet_balance WHERE id = ?", [id]);
  }
}
