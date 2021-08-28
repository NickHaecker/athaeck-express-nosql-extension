"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = require("./src/abstracts/express/index");
const express_1 = __importDefault(require("express"));
// class Portal extends AbstractExpressRoute {
//     constructor() {
//         super("/.*/",ExpressRouteType.GET);
//         // console.log(this);
//     }
//     handleRequest = (_req: express.Request, _res: express.Response) => {
//         console.log(_req, _res);
//         _res.sendFile(path.join(__dirname, "../portal/dist/index.html"));
//     }
// }
class AthaeckBackend extends index_1.ExpressApplication {
    constructor() {
        super();
        this.createRoutes();
        this._app = this.intializeRoutes(this._app, this._routes);
        this.createAdapter(this._router, __dirname);
        this._app = this.initializeAdapter(this._app, this._router);
        this.initializeMiddlewares();
    }
    createRoutes() {
        const classes = [];
        if (classes.length === 0) {
            return;
        }
        for (const cls of classes) {
            this._routes.push(new cls());
        }
    }
    initializeMiddlewares() {
        this._app.use(body_parser_1.default.json());
        this._app.use("/", express_1.default.static(path_1.default.join(__dirname, "../portal/dist")));
        this._app.get(/.*/, function (_req, res) {
            res.sendFile(path_1.default.join(__dirname, "../portal/dist/index.html"));
        });
    }
}
new AthaeckBackend().main();
//# sourceMappingURL=index.js.map