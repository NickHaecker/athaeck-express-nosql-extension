
import {  ExpressRouter } from "../src/abstracts/express/index";


class MongodbApi extends ExpressRouter {
    constructor() {
        super("/mongodb", "mongodb");
        this.createRoutes();
        this._app = this.intializeRoutes(this._app, this._routes);
        this._app = this.initializeExtensions(this._app, this._adapter, __dirname);
    }
    public createRoutes(): void {
        const classes: any[] = [
            // User
        ];
        if (classes.length === 0) { return; }
        for (const cls of classes) {
            this._routes.push(new cls());
        }
    }
}


module.exports = MongodbApi;