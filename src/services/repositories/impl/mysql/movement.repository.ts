import { MySqlPool } from "../../../../common/persistence/mysql.persistence";
import { Movement } from "../../domain/movement";
import { MovementInteface } from "../../interfaces/movement.interface";

export class MovementMySQLRepository implements MovementInteface {
  mysqlPool: MySqlPool;

  constructor() {
    this.mysqlPool = new MySqlPool();
  }

  async find(id: number): Promise<Movement | null> {
    const rows = await this.mysqlPool
      .createMySqlPool()
      .promise()
      .execute("SELECT * FROM wallet_movement WHERE id = ?", [id]);

    if (rows.length) {
      return rows[0] as Movement[];
    }

    return null;
  }

  async all(): Promise<Movement[]> {
    const [rows]: any[] = await this.mysqlPool
      .createMySqlPool()
      .promise()
      .execute("SELECT * FROM wallet_movement ORDER BY id DESC");

    return rows as Movement[];
  }

  async store(entry: Movement): Promise<void> {
    const now = new Date();
    await this.mysqlPool
      .createMySqlPool()
      .promise()
      .execute(
        "INSERT INTO wallet_movement(user_id, type, amount, created_at) VALUES(?, ?, ?, ?)",
        [entry.user_id, entry.type, entry.amount, now]
      );
  }

  async update(entry: Movement): Promise<void> {
    const now = new Date();
    await this.mysqlPool
      .createMySqlPool()
      .promise()
      .execute(
        "UPDATE wallet_movement SET user_id = ?, type = ?, amount = ?, updated_at = ? WHERE id = ?",
        [entry.user_id, entry.type, entry.amount, now, entry.id]
      );
  }

  async remove(id: number): Promise<void> {
    await this.mysqlPool
      .createMySqlPool()
      .promise()
      .execute("ELETE FROM wallet_movement WHERE id = ?", [id]);
  }
}
