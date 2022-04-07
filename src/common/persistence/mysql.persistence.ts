import { createPool } from "mysql2";
export class MySqlPool {
  public createMySqlPool() {
    return createPool({
      host: process.env.db_mysql_host as string,
      user: process.env.db_mysql_user as string,
      password: process.env.db_mysql_password as string,
      database: process.env.db_mysql_database as string,
      connectionLimit: 10,
      decimalNumbers: true,
    });
  }
}
