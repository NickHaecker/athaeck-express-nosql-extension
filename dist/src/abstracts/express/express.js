"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeResponse = exports.ExpressApplication = exports.ExpressRouter = exports.ExpressRoutingAddon = exports.ExpressRoute = exports.ExpressRouteType = exports.ExpressClassType = void 0;
const express_1 = __importStar(require("express"));
const config_1 = __importDefault(require("config"));
var ExpressClassType;
(function (ExpressClassType) {
    ExpressClassType["APP"] = "APP";
    ExpressClassType["ROUTER"] = "ROUTER";
    ExpressClassType["ROUTE"] = "ROUTE";
})(ExpressClassType = exports.ExpressClassType || (exports.ExpressClassType = {}));
var ExpressRouteType;
(function (ExpressRouteType) {
    ExpressRouteType["GET"] = "GET";
    ExpressRouteType["POST"] = "POST";
    ExpressRouteType["DELETE"] = "DELETE";
    ExpressRouteType["PUT"] = "PUT";
})(ExpressRouteType = exports.ExpressRouteType || (exports.ExpressRouteType = {}));
// export interface InterfaceExpressClass {
//     app: any;
//     intializeRoutes(): void;
//     createRoutes(): void;
// }
// export abstract class AbstractExpressRoute {
//     public route: string;
//     public routeTpye: ExpressRouteType;
//     constructor(_route: string, _routeType: ExpressRouteType) {
//         this.route = _route;
//         this.routeTpye = _routeType;
//     }
//     abstract handleRequest(_req: express.Request, _res: express.Response): void;
// }
class ExpressRoute {
    _route;
    _routeType;
    constructor(route, routeType) {
        this._route = route;
        this._routeType = routeType;
    }
    get route() {
        return this._route;
    }
    get routeType() {
        return this._routeType;
    }
    handleRequest = (req, res, next) => {
        res.send(`this is ${this._route}`);
    };
}
exports.ExpressRoute = ExpressRoute;
class ExpressRoutingAddon {
    intializeRoutes(app, routes) {
        for (const route of routes) {
            if (!route) {
                break;
            }
            switch (route.routeType) {
                case ExpressRouteType.GET:
                    app.get(route.route, route.handleRequest);
                    break;
                case ExpressRouteType.POST:
                    app.post(route.route, route.handleRequest);
                    break;
                case ExpressRouteType.DELETE:
                    app.delete(route.route, route.handleRequest);
                    break;
                default:
                    app.put(route.route, route.handleRequest);
                    break;
            }
        }
        return app;
    }
}
exports.ExpressRoutingAddon = ExpressRoutingAddon;
class ExpressRouter extends ExpressRoutingAddon {
    _app = express_1.Router();
    _routes = [];
    _router = [];
    _path;
    _adapter;
    constructor(path, adapter) {
        super();
        this._path = path;
        this._adapter = adapter;
        console.log(`----init adapter ${this._adapter} with path ${path}----`);
    }
    get path() {
        return this._path;
    }
    get adapter() {
        return this._adapter;
    }
    get app() {
        return this._app;
    }
    initializeExtensions(app, adapter) {
        const extensions = config_1.default.get("extensions");
        for (const extension of extensions[adapter]) {
            const extClass = require(`./extensions/${extension}`);
            if (!extClass) {
                break;
            }
            const extensionClass = new extClass();
            app.use(extensionClass.path, extensionClass.app);
        }
        return app;
    }
}
exports.ExpressRouter = ExpressRouter;
// export abstract class AbstractExpressRouter implements InterfaceExpressClass {
//     public app = Router();
//     abstract routes: AbstractExpressRoute[] = [];
//     abstract path: string;
//     protected router: AbstractExpressRouter[] = [];
//     protected adapter: string;
//     constructor(_adapter: string) {
//         this.adapter = _adapter;
//     }
//     abstract initializeExtensions(): void;
//     abstract createRoutes(): void;
//     intializeRoutes(): void {
//         console.log(`----init Adapter " + ${this.adapter} with route: ${this.path}`);
//         for (const route of this.routes) {
//             switch (route.routeTpye) {
//                 case ExpressRouteType.GET:
//                     console.log("12", route);
//                     this.app.get(route.route, route.handleRequest);
//                     break;
//                 case ExpressRouteType.POST:
//                     this.app.post(route.route, route.handleRequest);
//                     break;
//                 case ExpressRouteType.DELETE:
//                     this.app.delete(route.route, route.handleRequest);
//                     break;
//                 default:
//                     this.app.put(route.route, route.handleRequest);
//                     break;
//             }
//         }
//     }
// }
class ExpressApplication extends ExpressRoutingAddon {
    _app = express_1.default();
    _routes = [];
    _router = [];
    _port;
    constructor() {
        super();
        this._port = process.env.PORT || 3030;
    }
    initializeAdapter(app, router) {
        for (const adapter of router) {
            app.use(adapter.path, adapter.app);
        }
        return app;
    }
    createAdapter(router) {
        const { adapter } = config_1.default;
        for (const adp of adapter) {
            const adapterClass = require(`./${adp}`);
            if (!adapterClass) {
                return;
            }
            else {
                router.push(new adapterClass());
            }
        }
    }
    main() {
        this._app.listen(this._port, () => {
            console.log(`server started at http://localhost:${this._port}`);
        });
    }
}
exports.ExpressApplication = ExpressApplication;
// export abstract class AbstractExpressApplication implements InterfaceExpressClass {
//     public app = express();
//     abstract routes: AbstractExpressRoute[] = [];
//     protected port: string | number;
//     protected router: AbstractExpressRouter[] = [];
//     constructor(_port: string | number) {
//         this.port = _port;
//     }
//     abstract initializeMiddlewares(): void;
//     intializeRoutes(): void {
//         for (const route of this.routes) {
//             switch (route.routeTpye) {
//                 case ExpressRouteType.GET:
//                     console.log("12", route);
//                     this.app.get(route.route, route.handleRequest);
//                     break;
//                 case ExpressRouteType.POST:
//                     this.app.post(route.route, route.handleRequest);
//                     break;
//                 case ExpressRouteType.DELETE:
//                     this.app.delete(route.route, route.handleRequest);
//                     break;
//                 default:
//                     this.app.put(route.route, route.handleRequest);
//                     break;
//             }
//         }
//     }
//     abstract createRoutes(): void;
//     abstract initializeAdapter(): void;
//     abstract createAdapter(): void;
//     abstract main(): void;
// }
function makeResponse(res, code, body = null) {
    res.status(code).send(body);
}
exports.makeResponse = makeResponse;
//# sourceMappingURL=express.js.map