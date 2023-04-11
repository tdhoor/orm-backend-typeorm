import { DB } from "../db";
import { bukdInsertMssql } from "@core/functions/bulk-insert-mssql.function";

export async function insert<T>(type: (new () => T), data: any[]) {
    const table = DB.manager.connection.getMetadata(type).tableName;
    await bukdInsertMssql(table, data);
}