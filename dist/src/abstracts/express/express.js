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
const path_1 = __importDefault(require("path"));
const index_1 = require("./../index");
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
class ExpressRoute {
    _route;
    _routeType;
    _plattform = null;
    constructor(route, routeType) {
        this._route = route;
        this._routeType = routeType;
        console.log(`----requested ${this._route} with method ${this._routeType} ----`);
    }
    get route() {
        return this._route;
    }
    get routeType() {
        return this._routeType;
    }
    resolvePlattform(plattform) {
        return (0, index_1.ResolvePlattform)(plattform);
    }
    handleRequest = (_req, _res, _next) => {
        makeResponse(_res, 200, `this is ${this._route}`);
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
    _app = (0, express_1.Router)();
    _routes = [];
    _router = [];
    _path;
    _adapter;
    constructor(path, adapter) {
        super();
        this._path = path;
        this._adapter = adapter;
        console.log(`----init adapter ${this._adapter} with path ${path} ----`);
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
    initializeExtensions(app, adapter, dirname) {
        const extensions = config_1.default.get("extensions");
        for (const extension of extensions[adapter]) {
            const extClass = require(`${dirname}/extensions/${extension}`);
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
class ExpressApplication extends ExpressRoutingAddon {
    _app = (0, express_1.default)();
    _routes = [];
    _router = [];
    _port;
    constructor() {
        super();
        this._port = process.env.PORT || 4040;
    }
    initializeAdapter(app, router) {
        for (const adapter of router) {
            app.use(adapter.path, adapter.app);
        }
        return app;
    }
    createAdapter(router, dir) {
        try {
            const { adapter } = config_1.default;
            for (const adp of adapter) {
                const p = path_1.default.join(`${dir}/${adp}`);
                console.log(p);
                const adapterClass = require(p);
                if (!adapterClass) {
                    break;
                }
                else {
                    const instance = new adapterClass();
                    if (!instance) {
                        break;
                    }
                    router.push(instance);
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    main() {
        this._app.listen(this._port, () => {
            console.log(`server started at http://localhost:${this._port}`);
        });
    }
}
exports.ExpressApplication = ExpressApplication;
function makeResponse(res, code, body = null) {
    res.status(code).send(body);
}
exports.makeResponse = makeResponse;
//# sourceMappingURL=express.js.map