"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongodb_2 = require("../plattform/mongodb");
const config_1 = __importDefault(require("config"));
class MongoDB extends mongodb_2.AbstractMongoDb {
    constructor() {
        super();
        this._dbConfig = config_1.default.get("mongodb");
        this._url = this._dbConfig["url"];
        this.Connect();
    }
    async Connect() {
        this._client = await mongodb_1.MongoClient.connect(this._url);
    }
    async GetDB(db) {
        await this.Connect();
        // console.log(this._client)
        return await this._client?.db(db);
    }
}
module.exports = MongoDB;
//# sourceMappingURL=index.js.map