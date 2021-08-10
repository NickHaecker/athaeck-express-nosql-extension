import express from "express";
import path from "path";
import api from "index";
// import serveStatic  from "serve-static";
const app = express();
const port: Number = 3000;
const enviroment = process.env.NODE_ENV;
const isProduction = enviroment === "production";
if (isProduction) {
    app.use("/", express.static("/portal/dist"));
    app.get(/.*/, function (_req, res) {
        res.sendFile(path.join(__dirname, "/portal/dist/index.html"));
    });
}
app.use("/api", api({}));


app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );