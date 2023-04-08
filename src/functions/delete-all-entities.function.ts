import { DB } from "src/db";

let notFirstCall = false;

export async function deleteAllEntities() {
    const entities = DB.entityMetadatas;
    for (const entity of entities) {
        if (notFirstCall) {
            await DB.query(`DELETE from [${entity.tableName}];`)
            await DB.query(`DBCC CHECKIDENT ([${entity.tableName}], RESEED, 0);`);
        }
    }
    notFirstCall = true;
}