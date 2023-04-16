import { bulkInsertMysql } from "@core/functions/bulk-insert-mysql.function";
import { DB } from "../db";
import mysql from "mysql2";

export async function insert<T>(type: (new () => T), data: any[]) {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    const tableName = DB.manager.getRepository(type).metadata.tableName;
    await bulkInsertMysql(pool, tableName, data);
    pool.end();
}
