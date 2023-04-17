import { DB } from "../db";
import { bulkInsertMssql } from "@core/functions/bulk-insert-mssql.function";
import sql from "mssql";

export async function insert<T>(type: (new () => T), data: any[]) {
    console.log("Inserting data into table: " + DB.manager.connection.getMetadata(type).tableName + " length: " + data.length);
    const table = DB.manager.connection.getMetadata(type).tableName;
    await bulkInsertMssql(sql, table, data);
    console.log("\tInserted data into table: " + DB.manager.connection.getMetadata(type).tableName + " length: " + data.length);
}