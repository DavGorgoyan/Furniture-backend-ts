import { TRoute } from './lib/types';
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

// ROUTES
import apiRouter from "./api";

dotenv.config();


const app: Application = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(
    "/images",
    express.static(
        path.join(path.resolve(`public`, `protected_files`)
        )));

const rootRoutes: TRoute[] = [
    { path: "/api", router: apiRouter },
]


rootRoutes.forEach(route => {
    app.use(route.path, route.router);
})

app.use('*', (req, res) => {
    res.status(404).json({
        meta: {
            error: {
                code: 4040,
                message: `Request URL does not exist`
            },
            status: 404
        },
        data: {}
    })
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err?.status || 500).json({
        meta: {
            error: {
                code: err.code || err.errCode || 5000,
                message: err.message || err.errMessage || "Unknown Error"
            },
            status: err?.status || 500
        },
        data: {}
    })
});


export default app;
