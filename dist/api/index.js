"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.default = ({}) => {
    const api = express_1.Router();
    api.get("/", (_req, _res) => {
        _res.send("athaeck-api");
    });
    // api.get("/access", (req, res) => {
    // })
    return api;
};
//# sourceMappingURL=index.js.map