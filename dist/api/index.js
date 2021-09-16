"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/abstracts/express/index");
class Api extends index_1.ExpressRoute {
    constructor() {
        super("/", index_1.ExpressRouteType.GET);
    }
    handleRequest = (_req, _res, _next) => {
        (0, index_1.makeResponse)(_res, 200, "athaeck-api");
    };
}
class ApiAdapter extends index_1.ExpressRouter {
    constructor() {
        super("/api/v1", "api");
        this.createRoutes();
        this._app = this.intializeRoutes(this._app, this._routes);
        this._app = this.initializeExtensions(this._app, this._adapter);
    }
    createRoutes() {
        const classes = [
            Api
        ];
        if (classes.length === 0) {
            return;
        }
        for (const cls of classes) {
            this._routes.push(new cls());
        }
    }
}
module.exports = ApiAdapter;
//# sourceMappingURL=index.js.map