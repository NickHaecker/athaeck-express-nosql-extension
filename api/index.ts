import express from "express";
import { ExpressRoute, ExpressRouter, ExpressRouteType, makeResponse } from "../src/abstracts/express/index";

class Api extends ExpressRoute {
    constructor() {
        super("/", ExpressRouteType.GET);
    }
    handleRequest = (_req: express.Request, _res: express.Response, _next: express.NextFunction) => {
        makeResponse(_res, 200, "athaeck-api");
    }
}
class ApiAdapter extends ExpressRouter {
    constructor() {
        super("/api/v1", "api");
        this.createRoutes();
        this._app = this.intializeRoutes(this._app, this._routes);
        this._app = this.initializeExtensions(this._app, this._adapter);
    }
    public createRoutes(): void {
        const classes: any[] = [
            Api
        ];
        if (classes.length === 0) { return; }
        for (const cls of classes) {
            this._routes.push(new cls());
        }
    }
}

module.exports = ApiAdapter;