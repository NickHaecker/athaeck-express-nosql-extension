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
// class Application extends AbstractExpressApplication {
//     public app: Express = express();
//     public routes: AbstractExpressRoute[] = [];

//     private enviroment: string | undefined = process.env.NODE_ENV;
//     private isProduction: boolean;

//     constructor() {
//         super(process.env.PORT || 3030);
//         this.isProduction = this.enviroment === "production";
//         this.initializeMiddlewares();
//         this.createRoutes();
//         this.intializeRoutes();
//         this.createAdapter();
//         this.initializeAdapter();
//     }

//     public initializeMiddlewares(): void {
        // this.app.use(bodyParser.json());
        // this.app.use("/", express.static(path.join(__dirname, "../portal/dist")));
        // this.app.get(/.*/, function (_req, res) {
        // res.sendFile(path.join(__dirname, "../portal/dist/index.html"));
        // });
//     }

//     public initializeAdapter(): void {
//         // console.log(this.router)
//         for (const adapter of this.router) {
//             this.app.use(adapter.path, adapter.app);
//             // console.log(this.app)
//         }
//     }
//     public createAdapter(): void {
//         const { adapter } = config as any;
//         for (const adp of adapter) {
//             const adapterClass: any = require(`./${adp}`);
//             if (!adapterClass ) {
//                 return;
//             } else {
//                 this.router.push(new adapterClass());
//                 // console.log(this.router);
//             }
//         }
//     }
//     public createRoutes(): void {
        // const classes: any[] = [
            
        // ]
        // if (classes.length === 0) { return; }
        // for (const cls of classes) {
        //     this.routes.push(new cls());
        // }
//     }


//     public main(): void {
//         const port: string | number = this.port;
//         this.app.listen(port, () => {
//             console.log( `server started at http://localhost:${ port }` );
//         });
//     }

// }

new AthaeckBackend().main();
