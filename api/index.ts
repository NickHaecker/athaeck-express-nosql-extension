// // import { Router } from "express";
// // export default ({ }) => {
// //     const api = Router();
// //     api.get("/", (_req, _res) => {
// //         _res.send("athaeck-api");
// //     });
// //     // api.get("/access", (req, res) => {

// //     // })
// //     return api;
// // };
// // import AbstractExpressRouter from "."
// import express from "express";
// import config from "config";

// class Api extends AbstractExpressRoute {
//     constructor() {
//         super("/", ExpressRouteType.GET);
//     }
//     public handleRequest = (_req: express.Request, _res: express.Response) => {
//         console.log(2);
//         makeResponse(_res, 200, "athaeck-api");
//     }
// }
import express from "express"
import { ExpressRoute, ExpressRouter, ExpressRouteType } from "../src/abstracts/express/index";
class Api extends ExpressRoute{
    constructor() {
        super("/", ExpressRouteType.GET)
    }
    handleRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log(1)
    }
}
class ApiAdapter extends ExpressRouter{
    constructor() {
        super("/", "api")
        
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
// class ApiAdapter extends AbstractExpressRouter {
//     public routes: AbstractExpressRoute[] = [];
//     public path: string = "/api";
//     constructor() {
//         super( "api");
//         this.createRoutes();
//         this.intializeRoutes();
//         this.initializeExtensions();
//     }
//     public initializeExtensions(): void {
        // const extensions = config.get("extensions") as any;
        // for (const extension of extensions[this.adapter]) {
        //     const extClass = require(`./extensions/${extension}`);
        //     if (!extClass) {return; }
        //     const extensionClass = new extClass() as AbstractExpressRouter;
        //     this.app.use(extensionClass.path, extensionClass.app);
        // }
//     }
//     public createRoutes(): void {
//         const classes: any[] = [
//             Api
//         ];
//         if (classes.length === 0) { return; }
//         for (const cls of classes) {
//             this.routes.push(new cls());
//         }
//     }
// }
module.exports = ApiAdapter;