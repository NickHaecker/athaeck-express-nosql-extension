"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendRole = void 0;
const index_1 = require("../../../src/abstracts/express/index");
var BackendRole;
(function (BackendRole) {
    BackendRole["ADMIN"] = "ADMIN";
})(BackendRole = exports.BackendRole || (exports.BackendRole = {}));
class GetAllUser extends index_1.ExpressRoute {
    _collection;
    constructor() {
        super("/all/user", index_1.ExpressRouteType.GET);
        this.InitRoute();
    }
    handleRequest = async (_req, _res, _next) => {
        try {
            let backendUser = [];
            if (this._collection) {
                const userCursor = await this._collection.find({});
                backendUser = await userCursor.toArray();
            }
            (0, index_1.makeResponse)(_res, 200, backendUser);
        }
        catch (e) {
            (0, index_1.makeResponse)(_res, 404, e);
        }
    };
    async InitRoute() {
        const plattform = await this.resolvePlattform("mongodb");
        const db = await plattform.GetDB("athaeck-backend");
        this._plattform = plattform;
        this._collection = await db?.collection("user");
    }
}
class BackendData extends index_1.ExpressRouter {
    constructor() {
        super("/backend", "backend");
        this.createRoutes();
        this._app = this.intializeRoutes(this._app, this._routes);
    }
    createRoutes() {
        const classes = [
            GetAllUser
        ];
        if (classes.length === 0) {
            return;
        }
        for (const cls of classes) {
            this._routes.push(new cls());
        }
    }
}
module.exports = BackendData;
//# sourceMappingURL=index.js.map