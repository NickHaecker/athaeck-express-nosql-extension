"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const express_1 = __importDefault(require("express"));
class Application extends index_1.AbstractExpressApplication {
    app = express_1.default();
    type;
    constructor() {
        super(process.env.PORT || 3030);
        this.createController();
        this.initializeMiddlewares();
        this.initializeController(this.router);
    }
    initializeMiddlewares() {
    }
    initializeController(_router) {
    }
    createController() {
    }
    main() {
        const port = this.port;
        this.app.listen(port, () => {
            console.log(`server started at http://localhost:${port}`);
        });
    }
}
//# sourceMappingURL=class.js.map