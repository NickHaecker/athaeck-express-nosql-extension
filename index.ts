import path from "path";
import config from "config";
import bodyParser from "body-parser";
import {AbstractExpressApplication, ExpressClassType, AbstractExpressRouter, AbstractExpressRoute, ExpressRouteType} from "./src/abstracts/express/index";
import express, { Express } from "express";
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
class Application extends AbstractExpressApplication {
    public app: Express = express();
    public routes: AbstractExpressRoute[] = [];

    private enviroment: string | undefined = process.env.NODE_ENV;
    private isProduction: boolean;

    constructor() {
        super(process.env.PORT || 3030);
        this.isProduction = this.enviroment === "production";
        this.initializeMiddlewares();
        this.createRoutes();
        this.intializeRoutes();
        this.createAdapter();
        this.initializeAdapter();
    }

    public initializeMiddlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use("/", express.static(path.join(__dirname, "../portal/dist")));
        this.app.get(/.*/, function (_req, res) {
        res.sendFile(path.join(__dirname, "../portal/dist/index.html"));
        });
    }

    public initializeAdapter(): void {


    }
    public createAdapter(): void {

    }
    public createRoutes(): void {
        // this.routes.push(new Portal());
    }


    public main(): void {
        const port: string | number = this.port;
        this.app.listen(port, () => {
            console.log( `server started at http://localhost:${ port }` );
        });
    }

}

new Application().main();
