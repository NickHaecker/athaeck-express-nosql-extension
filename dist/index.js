"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./api/index"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const port = process.env.PORT || 3030;
const enviroment = process.env.NODE_ENV;
const isProduction = enviroment === "production";
app.use(body_parser_1.default.json());
app.use("/api", index_1.default({}));
if (isProduction) {
    app.use("/", express_1.default.static(path_1.default.join(__dirname, "../portal/dist")));
    app.get(/.*/, function (_req, res) {
        res.sendFile(path_1.default.join(__dirname, "../portal/dist/index.html"));
    });
}
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map