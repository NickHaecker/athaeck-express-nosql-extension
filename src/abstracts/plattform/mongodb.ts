import { Db, MongoClient } from "mongodb";

export abstract class AbstractMongoDb {
    protected _dbConfig: any;
    protected _url: string;
    protected _client: MongoClient | undefined;
    abstract Connect(): Promise<void>;
    abstract GetDB(db: string): Promise<Db|undefined>;
}