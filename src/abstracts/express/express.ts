import express, { Router } from "express";
import config from "config";
export enum ExpressClassType {
    APP = "APP", ROUTER = "ROUTER", ROUTE = "ROUTE"
}
export enum ExpressRouteType {
    GET = "GET", POST = "POST", DELETE = "DELETE", PUT = "PUT"
}


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
        console.log(`----init adapter ${this._adapter} with path ${path}----`);
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
    createAdapter(router: ExpressRouter[]): void {
        const { adapter } = config as any;
        for (const adp of adapter) {
            const adapterClass: any = require(`./${adp}`);
            if (!adapterClass ) {
                return;
            } else {
                router.push(new adapterClass());
            }
        }
    }
    main(): void {
        this._app.listen(this._port, () => {
            console.log( `server started at http://localhost:${ this._port }` );
        });
    }
}

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

export function makeResponse(res: express.Response, code: number, body: any = null): void {
    res.status(code).send(body);
}
