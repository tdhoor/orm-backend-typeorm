import { DB } from "src/db";

export async function deleteAllEntities() {
    const entities = DB.entityMetadatas;
    for (const entity of entities) {
        await DB.query('SET FOREIGN_KEY_CHECKS = 0;');
        await DB.query('TRUNCATE table `' + entity.tableName + '`;');
        await DB.query('SET FOREIGN_KEY_CHECKS = 1;');
    }
}