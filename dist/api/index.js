"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/abstracts/express/index");
// class Api extends ExpressRoute {
//     constructor() {
//         super("/", ExpressRouteType.GET);
//     }
//     handleRequest = (_req: express.Request, _res: express.Response, _next: express.NextFunction) => {
//         makeResponse(_res, 200, "athaeck-mongodb-api");
//     }
// }
class MongodbApi extends index_1.ExpressRouter {
    constructor() {
        super("/mongodb", "mongodb");
        this.createRoutes();
        this._app = this.intializeRoutes(this._app, this._routes);
        this._app = this.initializeExtensions(this._app, this._adapter);
    }
    createRoutes() {
        const classes = [
        // Api
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