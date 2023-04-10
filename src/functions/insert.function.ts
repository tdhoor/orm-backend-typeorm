import { DB } from "../db";

export function insert<T>(type: (new () => T), data: any[]) {
    return DB.manager.createQueryBuilder()
        .insert()
        .into(type)
        .values(data)
        .execute()
}
