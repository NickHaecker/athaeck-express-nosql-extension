import { BaseExpressRoute, BaseExpressRouter, ExpressRouteType } from "../athaeck-express-base/base/express";



export abstract class BaseNoSQLExpressRouteExtension extends BaseExpressRoute {
    protected db: any | undefined

    constructor(route: string, routeType: ExpressRouteType) {
        super(route, routeType)
    }
}

export abstract class BaseNoSQLExpressRouterExtension extends BaseExpressRouter {
    protected plattform: any | undefined
    

    constructor() {
        super()

    }
}