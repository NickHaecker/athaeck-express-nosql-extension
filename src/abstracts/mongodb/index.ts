import { MongoClient, Db } from "mongodb";
import {AbstractMongoDb} from "../plattform/mongodb";
import config from "config";
class MongoDB extends AbstractMongoDb {
    constructor() {
        super();
        this._dbConfig = config.get("mongodb");
        this._url = this._dbConfig["url"];
        this.Connect();
    }
    public async Connect(): Promise<void> {
        this._client = await MongoClient.connect(this._url)
    }
    public async GetDB(db: string): Promise<Db|undefined> {
        await this.Connect();
        // console.log(this._client)
        return await this._client?.db(db);
    }
}
module.exports = MongoDB;