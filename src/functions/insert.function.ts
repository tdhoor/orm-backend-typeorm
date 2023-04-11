import { DB } from "../db";
import { bulkInsertMssql } from "@core/functions/bulk-insert-mssql.function";
import sql from "mssql";

export async function insert<T>(type: (new () => T), data: any[]) {
    const table = DB.manager.connection.getMetadata(type).tableName;
    await bulkInsertMssql(sql, table, data);
}