import express, { Express, json } from "express"
import RouterCollection from "../router/router-collection";
import ErrorHandlerMiddleware from "../error/middleware/error-handler-middleware";
import Server from "./interfaces/server";
import ReadingRouter from "../router/reading-router";
import cors from "cors";
import { corsConfig } from "./cors/cors-config";

export default class ExpressServer implements Server {
    private static instance: ExpressServer;
    private readonly app: Express;
    private readonly routerCollection: RouterCollection;

    private constructor() {
        this.app = express()
        this.routerCollection = new RouterCollection(
            [
                new ReadingRouter(this.app)
            ]
        );
    }

    public static getInstance(): ExpressServer {
        if (!ExpressServer.instance) {
            ExpressServer.instance = new ExpressServer();
        }
        return ExpressServer.instance
    }

    public listen(port: number): void {
        this.app.use(json());
        this.app.use(cors(corsConfig));
        this.routerCollection.getRouters().forEach(router => router.route());
        this.app.listen(port, () => {
            console.log("Listening on port: " + port);
        })
        this.app.use(ErrorHandlerMiddleware.getInstance().handle);
    }
}