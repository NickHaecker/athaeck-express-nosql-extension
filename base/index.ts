import { BaseExpressRoute, BaseExpressRouter, ExpressRouteType } from "../athaeck-express-base/base/express";
import { BaseDB } from "./db/types";
import path from 'path';



export abstract class BaseNoSQLExpressRouteExtension extends BaseExpressRoute {
    protected db: any | undefined
    abstract dbName: string

    constructor(route: string, routeType: ExpressRouteType) {
        super(route, routeType)
    }

    public TakeRouter(router: BaseExpressRouter): void {
        super.TakeRouter(router)
        const sqlRouter: BaseNoSQLExpressRouterExtension = <BaseNoSQLExpressRouterExtension>router
        this.db = sqlRouter.Plattform?.GetDB(this.dbName)
    }
}

export abstract class BaseNoSQLExpressRouterExtension extends BaseExpressRouter {
    protected plattform: BaseDB | undefined
    protected noSQLFactory: BaseNoSQLFactory
    abstract noSQLName: string

    constructor() {
        super()
        this.Init()
    }
    protected async Init(): Promise<void> {
        await this.CreatePlattform()
    }

    public get Plattform() {
        return this.plattform
    }

    protected async CreatePlattform(): Promise<void> {
        this.plattform = await this.noSQLFactory.CreateNoSQL(this.noSQLName)
        console.log(this.plattform)
    }
}

export abstract class BaseNoSQLFactory {
    protected rootFolder: string
    protected rootDir: string
    constructor(root: string) {
        this.rootFolder = root
    }
    public CreateNoSQL(name: string): BaseDB | undefined {
        const pathTo: string = path.join(this.rootDir + this.rootFolder + name)

        console.log(pathTo)
        const NoSQL = require(pathTo)
        const db: BaseDB = new NoSQL()
        if (!db) {
            return undefined
        }
        return db

    }
}