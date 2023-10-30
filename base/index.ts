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
    }
}

export abstract class BaseNoSQLFactory {
    protected rootFolder: string
    constructor(root: string) {
        this.rootFolder = root
    }
    public CreateNoSQL(name: string): BaseDB | undefined {
        console.log(2222222)
        console.log(this.rootFolder + name)
        const NoSQL: BaseDB = require(this.rootFolder + name)
        // console.log(NoSQL)
        if (!NoSQL) {
            return undefined
        }
        return NoSQL
    }
}