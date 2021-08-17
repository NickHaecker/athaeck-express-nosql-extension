"use strict";
// import { Router } from "express";
// export default ({ }) => {
//     const api = Router();
//     api.get("/", (_req, _res) => {
//         _res.send("athaeck-api");
//     });
//     // api.get("/access", (req, res) => {
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const index_1 = require("../src/abstracts/express/index");
class Api extends index_1.AbstractExpressRoute {
    constructor() {
        super("/", index_1.ExpressRouteType.GET);
    }
    handleRequest = (_req, _res) => {
        console.log(2);
        index_1.makeResponse(_res, 200, "athaeck-api");
    };
}
class ApiAdapter extends index_1.AbstractExpressRouter {
    routes = [];
    path = "/api";
    constructor() {
        super("api");
        this.createRoutes();
        this.intializeRoutes();
        this.initializeExtensions();
    }
    initializeExtensions() {
        const extensions = config_1.default.get("extensions");
        for (const extension of extensions[this.adapter]) {
            const extClass = require(`./extensions/${extension}`);
            if (!extClass) {
                return;
            }
            const extensionClass = new extClass();
            this.app.use(extensionClass.path, extensionClass.app);
        }
    }
    createRoutes() {
        const classes = [
            Api
        ];
        if (classes.length === 0) {
            return;
        }
        for (const cls of classes) {
            this.routes.push(new cls());
        }
    }
}
module.exports = ApiAdapter;
//# sourceMappingURL=index.js.map