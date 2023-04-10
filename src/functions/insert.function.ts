import { getMaxBatchSize } from "@core/functions/get-max-batch-size.function";
import { DB } from "../db";

export async function insert<T>(type: (new () => T), data: any[]) {
    while (data.length) {
        await DB.manager.createQueryBuilder()
            .insert()
            .into(type)
            .values(data.splice(0, getMaxBatchSize(data)))
            .execute()
    }
}
