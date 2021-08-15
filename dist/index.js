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
class Application extends index_1.AbstractExpressApplication {
    app = express_1.default();
    routes = [];
    enviroment = process.env.NODE_ENV;
    isProduction;
    constructor() {
        super(process.env.PORT || 3030);
        this.isProduction = this.enviroment === "production";
        this.initializeMiddlewares();
        this.createRoutes();
        this.intializeRoutes();
        this.createAdapter();
        this.initializeAdapter();
    }
    initializeMiddlewares() {
        this.app.use(body_parser_1.default.json());
        this.app.use("/", express_1.default.static(path_1.default.join(__dirname, "../portal/dist")));
        this.app.get(/.*/, function (_req, res) {
            res.sendFile(path_1.default.join(__dirname, "../portal/dist/index.html"));
        });
    }
    initializeAdapter() {
    }
    createAdapter() {
    }
    createRoutes() {
        // this.routes.push(new Portal());
    }
    main() {
        const port = this.port;
        this.app.listen(port, () => {
            console.log(`server started at http://localhost:${port}`);
        });
    }
}
new Application().main();
//# sourceMappingURL=index.js.map