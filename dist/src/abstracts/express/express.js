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
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeResponse = exports.AbstractExpressApplication = exports.AbstractExpressRouter = exports.AbstractExpressRoute = exports.ExpressRouteType = exports.ExpressClassType = void 0;
const express_1 = __importStar(require("express"));
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
class AbstractExpressRoute {
    route;
    routeTpye;
    constructor(_route, _routeType) {
        this.route = _route;
        this.routeTpye = _routeType;
    }
}
exports.AbstractExpressRoute = AbstractExpressRoute;
class AbstractExpressRouter {
    app = express_1.Router();
    router = [];
    adapter;
    constructor(_adapter) {
        this.adapter = _adapter;
    }
    intializeRoutes() {
        for (const route of this.routes) {
            switch (route.routeTpye) {
                case ExpressRouteType.GET:
                    console.log("12", route);
                    this.app.get(route.route, route.handleRequest);
                    break;
                case ExpressRouteType.POST:
                    this.app.post(route.route, route.handleRequest);
                    break;
                case ExpressRouteType.DELETE:
                    this.app.delete(route.route, route.handleRequest);
                    break;
                default:
                    this.app.put(route.route, route.handleRequest);
                    break;
            }
        }
    }
}
exports.AbstractExpressRouter = AbstractExpressRouter;
class AbstractExpressApplication {
    app = express_1.default();
    port;
    router = [];
    constructor(_port) {
        this.port = _port;
    }
    intializeRoutes() {
        for (const route of this.routes) {
            switch (route.routeTpye) {
                case ExpressRouteType.GET:
                    console.log("12", route);
                    this.app.get(route.route, route.handleRequest);
                    break;
                case ExpressRouteType.POST:
                    this.app.post(route.route, route.handleRequest);
                    break;
                case ExpressRouteType.DELETE:
                    this.app.delete(route.route, route.handleRequest);
                    break;
                default:
                    this.app.put(route.route, route.handleRequest);
                    break;
            }
        }
    }
}
exports.AbstractExpressApplication = AbstractExpressApplication;
function makeResponse(_response, _statusCode, _responseBody = null) {
    _response.status(_statusCode).send(_responseBody);
}
exports.makeResponse = makeResponse;
//# sourceMappingURL=express.js.map