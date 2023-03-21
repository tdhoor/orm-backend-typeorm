import { DB } from "src/db";

export async function deleteAllEntities() {
    const entities = DB.entityMetadatas;
    const tableNames = entities.map((entity) => `"${entity.tableName}"`).join(", ");
    await DB.manager.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`);
}