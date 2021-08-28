import express, { Router } from "express";
import config from "config";
import path from "path";
export enum ExpressClassType {
    APP = "APP", ROUTER = "ROUTER", ROUTE = "ROUTE"
}
export enum ExpressRouteType {
    GET = "GET", POST = "POST", DELETE = "DELETE", PUT = "PUT"
}

export class ExpressRoute {
    protected _route: string;
    protected _routeType: ExpressRouteType;

    constructor(route: string, routeType: ExpressRouteType) {
        this._route = route;
        this._routeType = routeType;
    }

    get route(): string {
        return this._route;
    }

    get routeType(): ExpressRouteType {
        return this._routeType;
    }

    handleRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.send(`this is ${this._route}`);
    }
}

export abstract class ExpressRoutingAddon {
    abstract createRoutes(): void;
    intializeRoutes(app: any, routes: ExpressRoute[]): any {
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

export abstract class ExpressRouter extends ExpressRoutingAddon {
    protected _app = Router();
    protected _routes: ExpressRoute[] = [];
    protected _router: ExpressRouter[] = [];

    protected _path: string;
    protected _adapter: string;

    constructor(path: string, adapter: string) {
        super();
        this._path = path;
        this._adapter = adapter;
        console.log(`----init adapter ${this._adapter} with path ${path} ----`);
    }

    get path(): string {
        return this._path;
    }

    get adapter(): string {
        return this._adapter;
    }

    get app(): any {
        return this._app;
    }

    abstract createRoutes(): void;

    protected initializeExtensions(app: any, adapter: string): any {
        const extensions = config.get("extensions") as any;
        for (const extension of extensions[adapter]) {
            const extClass = require(`./extensions/${extension}`);
            if (!extClass) { break; }
            const extensionClass = new extClass() as ExpressRouter;
            app.use(extensionClass.path, extensionClass.app);
        }
        return app;
    }


}

export abstract class ExpressApplication extends ExpressRoutingAddon {

    protected _app = express();
    protected _routes: ExpressRoute[] = [];
    protected _router: ExpressRouter[] = [];

    protected _port: string | number;

    constructor() {
        super();
        this._port = process.env.PORT || 3030;
    }

    abstract createRoutes(): void;
    abstract initializeMiddlewares(): void;
    initializeAdapter(app: any, router: ExpressRouter[]): any {
         for (const adapter of router) {
            app.use(adapter.path, adapter.app);
        }
         return app;
    }
    createAdapter(router: ExpressRouter[], dir: any): void {
        try {
            const { adapter } = config as any;
            for (const adp of adapter) {
                const p: string = path.join(`${dir}/${adp}`);
                console.log(p);
                const adapterClass: any = require(p);
                if (!adapterClass) {
                    break;
                } else {
                    const instance = new adapterClass();
                    if (!instance) { break; }
                    router.push(instance);
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    main(): void {
        this._app.listen(this._port, () => {
            console.log( `server started at http://localhost:${ this._port }` );
        });
    }
}

export function makeResponse(res: express.Response, code: number, body: any = null): void {
    res.status(code).send(body);
}
