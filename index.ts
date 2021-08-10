import express from "express";
import path from "path";
import api from "./api/index";

const app = express();
const port = process.env.PORT || 3000;
const enviroment = process.env.NODE_ENV;
const isProduction = enviroment === "production";


app.use("/api", api({}));




if (isProduction) {
    app.use("/", express.static(path.join(__dirname, "../portal/dist")));
    app.get(/.*/, function (_req, res) {
        res.sendFile(path.join(__dirname, "../portal/dist/index.html"));
    });
}



app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );