"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./api/index"));
// import serveStatic  from "serve-static";
const app = express_1.default();
const port = 3000;
const enviroment = process.env.NODE_ENV;
const isProduction = enviroment === "production";
if (isProduction) {
    app.use("/", express_1.default.static("/portal/dist"));
    app.get(/.*/, function (_req, res) {
        res.sendFile(path_1.default.join(__dirname, "/portal/dist/index.html"));
    });
}
app.use("/api", index_1.default({}));
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map