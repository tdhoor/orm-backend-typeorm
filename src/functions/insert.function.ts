import { getMaxBatchSize } from "@core/functions/get-max-batch-size.function";
import { DB } from "../db";

export function insert<T>(type: (new () => T), data: any[]) {
    return DB.manager.save(type, data, { chunk: getMaxBatchSize(data) });
}