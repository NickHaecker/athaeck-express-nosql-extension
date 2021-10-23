"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("");
class User extends _1.ExpressRoute {
    _collection;
    constructor() {
        super("/get/user", _1.ExpressRouteType.GET);
    }
    handleRequest = (_req, _res, _next) => {
        // const user:
        (0, _1.makeResponse)(_res, 200, {});
    };
}
class BackendData extends _1.ExpressRouter {
    constructor() {
        super("/mongodb", "mongodb");
        this.createRoutes();
        this._app = this.intializeRoutes(this._app, this._routes);
        this._app = this.initializeExtensions(this._app, this._adapter);
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
module.exports = BackendData;
//# sourceMappingURL=index.js.map