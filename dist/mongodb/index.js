"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/abstracts/express/index");
class MongodbApi extends index_1.ExpressRouter {
    constructor() {
        super("/mongodb", "mongodb");
        this.createRoutes();
        this._app = this.intializeRoutes(this._app, this._routes);
        this._app = this.initializeExtensions(this._app, this._adapter, __dirname);
    }
    createRoutes() {
        const classes = [
        // User
        ];
        if (classes.length === 0) {
            return;
        }
        for (const cls of classes) {
            this._routes.push(new cls());
        }
    }
}
module.exports = MongodbApi;
//# sourceMappingURL=index.js.map