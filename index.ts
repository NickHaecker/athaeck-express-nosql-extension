import bodyParser from "body-parser";
import {ExpressApplication} from "./src/abstracts/express/index";

class AthaeckMongodbApi extends ExpressApplication {
    constructor() {
        super();
        this.createRoutes();
        this._app = this.intializeRoutes(this._app, this._routes);
        this.createAdapter(this._router, __dirname);
        this._app = this.initializeAdapter(this._app, this._router);
        this.initializeMiddlewares();
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
        this._app.use((_err, _req, _res, _next) => {
            const { statusCode = 500, message = "" } = _err;
            _res.status(statusCode).json({
              code: statusCode,
              result: message
            });
          });
    }
}


new AthaeckMongodbApi().main();
