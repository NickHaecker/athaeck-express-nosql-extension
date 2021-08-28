import path from "path";
import bodyParser from "body-parser";
import {ExpressApplication} from "./src/abstracts/express/index";
import express from "express";
// class Portal extends AbstractExpressRoute {
//     constructor() {
//         super("/.*/",ExpressRouteType.GET);
//         // console.log(this);
//     }
//     handleRequest = (_req: express.Request, _res: express.Response) => {
//         console.log(_req, _res);
//         _res.sendFile(path.join(__dirname, "../portal/dist/index.html"));
//     }
// }
class AthaeckBackend extends ExpressApplication {
    constructor() {
        super();
        this.initializeMiddlewares();
        this.createRoutes();
        this.intializeRoutes(this._app, this._routes);
        this.createAdapter(this._router, __dirname);
        this.initializeAdapter(this._app, this._router);
    }
    createRoutes(): void {
        const classes: any[] = [
            
        ];
        if (classes.length === 0) { return; }
        for (const cls of classes) {
            this._routes.push(new cls());
        }
    }
    initializeMiddlewares(): void {
        this._app.use(bodyParser.json());
        this._app.use("/", express.static(path.join(__dirname, "../portal/dist")));
        this._app.get(/.*/, function (req, res) {
        res.sendFile(path.join(__dirname, "../portal/dist/index.html"));
        });
    }
}


new AthaeckBackend().main();
