import { Router } from "express";
export default ({ }) => {
    const api = Router();
    api.get("/", (_req, res) => {
        console.log("api");
        res.send("athaeck-api");
    });
    return api;
};