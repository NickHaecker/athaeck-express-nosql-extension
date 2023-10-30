import { BaseExpressRoute, BaseExpressRouter, ExpressRouteType } from "../athaeck-express-base/base/express";
import { BaseDB } from "./db/types";



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

    constructor(noSQLName: string) {
        super()
        this.CreatePlattform(noSQLName)
    }

    public get Plattform() {
        return this.plattform
    }

    private async CreatePlattform(name: string) {
        this.plattform = await this.noSQLFactory.CreateNoSQL(name)
    }
}

export abstract class BaseNoSQLFactory {
    protected rootFolder: string
    constructor(root: string) {
        this.rootFolder = root
    }
    public CreateNoSQL(name: string): BaseDB | undefined {
        const NoSQL: BaseDB = require(this.rootFolder + name)
        if (!NoSQL) {
            return undefined
        }
        return NoSQL
    }
}