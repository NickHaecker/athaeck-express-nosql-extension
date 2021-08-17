import express, { Router } from "express";

export enum ExpressClassType {
    APP = "APP", ROUTER = "ROUTER", ROUTE = "ROUTE"
}
export enum ExpressRouteType {
    GET = "GET", POST = "POST", DELETE = "DELETE", PUT = "PUT"
}

export interface InterfaceExpressClass {
    app: any;

    intializeRoutes(): void;
    createRoutes(): void;
}

export abstract class AbstractExpressRoute {
    public route: string;
    public routeTpye: ExpressRouteType;

    constructor(_route: string, _routeType: ExpressRouteType) {
        this.route = _route;
        this.routeTpye = _routeType;
    }

    abstract handleRequest(_req: express.Request, _res: express.Response): void;
}

export abstract class AbstractExpressRouter implements InterfaceExpressClass {
    public app = Router();
 
    abstract routes: AbstractExpressRoute[] = [];

    abstract path: string;
    protected router: AbstractExpressRouter[] = [];
    protected adapter: string;

    constructor(_adapter: string) {
        this.adapter = _adapter;
    }
    
    abstract initializeExtensions(): void;
    
    abstract createRoutes(): void;
    intializeRoutes(): void {
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

export abstract class AbstractExpressApplication implements InterfaceExpressClass {
    public app = express();

    abstract routes: AbstractExpressRoute[] = [];

    protected port: string | number;
    protected router: AbstractExpressRouter[] = [];

    constructor(_port: string | number) {
        this.port = _port;
    }

    abstract initializeMiddlewares(): void;
    
    intializeRoutes(): void {
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
    
    abstract createRoutes(): void;

    abstract initializeAdapter(): void;
    abstract createAdapter(): void;

    abstract main(): void;
}

export function makeResponse(_response: express.Response, _statusCode: number, _responseBody: any = null): void {
    _response.status(_statusCode).send(_responseBody);
}
