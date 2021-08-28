"use strict";
// // import { Router } from "express";
// // export default ({ }) => {
// //     const api = Router();
// //     api.get("/", (_req, _res) => {
// //         _res.send("athaeck-api");
// //     });
// //     // api.get("/access", (req, res) => {
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/abstracts/express/index");
class Api extends index_1.ExpressRoute {
    constructor() {
        super("/", index_1.ExpressRouteType.GET);
    }
    handleRequest = (req, res, next) => {
        console.log(1);
    };
}
class ApiAdapter extends index_1.ExpressRouter {
    constructor() {
        super("/", "api");
    }
    createRoutes() {
        const classes = [
            Api
        ];
        if (classes.length === 0) {
            return;
        }
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
//# sourceMappingURL=index.js.map