import { Router } from "express";
export default ({ }) => {
    const api = Router();
    api.get("/", (_req, _res) => {
        _res.send("athaeck-api");
    });
    // api.get("/access", (req, res) => {

    // })
    return api;
};