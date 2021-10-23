"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = require("./src/abstracts/express/index");
class AthaeckMongodbApi extends index_1.ExpressApplication {
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
        this._app.use((_err, _req, _res, _next) => {
            const { statusCode = 500, message = "" } = _err;
            _res.status(statusCode).json({
                code: statusCode,
                result: message
            });
        });
    }
}
new AthaeckMongodbApi().main();
//# sourceMappingURL=index.js.map