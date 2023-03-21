import { DB } from "../db";

export function insert<T>(type: (new () => T), data: any[]) {
    return DB.manager.save(type, data, { chunk: 10000 });
}
