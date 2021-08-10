"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.default = ({}) => {
    const api = express_1.Router();
    api.get("/", (_req, res) => {
        console.log("api");
        res.send("athaeck-api");
    });
    return api;
};
//# sourceMappingURL=index.js.map