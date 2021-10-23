import express from "express";
import mongodb, { Db, FindCursor } from "mongodb";
import { ExpressRoute, ExpressRouter, ExpressRouteType, makeResponse } from "../../../src/abstracts/express/index";
import {AbstractMongoDb} from "../../../src/abstracts/plattform/mongodb";
export type EMail = {
    address: string,
    verified: boolean
};

export enum BackendRole {
    ADMIN= "ADMIN"
}

export type BackendUser = {
    _id: string,
    _username: string,
    _password: string,
    _email: EMail,
    _permissionID: string
};

export type BackenPermissions = {
    _id: string,
    _role: BackendRole
    _enabled: string[]
};

class GetAllUser extends ExpressRoute {
    private _collection: mongodb.Collection<BackendUser> | undefined;
    constructor() {
        super("/all/user", ExpressRouteType.GET);
        this.InitRoute();
    }
    handleRequest = async(_req: express.Request, _res: express.Response, _next: express.NextFunction) => {
        try {
            let backendUser: BackendUser[] = [];
            if (this._collection) {
                const userCursor: FindCursor<BackendUser> = await this._collection.find({});
                backendUser = await userCursor.toArray();
            }
            makeResponse(_res, 200, backendUser);
        } catch (e) {
            makeResponse(_res, 404, e);
        }
    }
    private async InitRoute(): Promise<void> {
        const plattform: AbstractMongoDb = await this.resolvePlattform("mongodb") as AbstractMongoDb;
        const db: Db | undefined = await plattform.GetDB("athaeck-backend");
        this._plattform = plattform;
        this._collection = await db?.collection("user");
    }
}
class BackendData extends ExpressRouter {
    constructor() {
        super("/backend", "backend");
        this.createRoutes();
        this._app = this.intializeRoutes(this._app, this._routes);
    }
    public createRoutes(): void {
        const classes: any[] = [
            GetAllUser
        ];
        if (classes.length === 0) { return; }
        for (const cls of classes) {
            this._routes.push(new cls());
        }
    }
}
module.exports = BackendData;