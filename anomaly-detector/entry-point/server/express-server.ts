import ErrorHandlerMiddleware from "../../error/middleware/error-handler-middleware";
import HumidityRouter from "../../router/humidity-router";
import RouterCollection from "../../router/router-collection";
import TemperatureRouter from "../../router/temperature-router";
import Server from "./interfaces/server";
import express, { Express, json } from "express"

export default class ExpressServer implements Server {
    private static instance: ExpressServer;
    private readonly app: Express;
    private readonly routerCollection: RouterCollection;

    private constructor() {
        this.app = express()
        this.routerCollection = new RouterCollection(
            [
                new TemperatureRouter(this.app),
                new HumidityRouter(this.app)
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
        this.routerCollection.getRouters().forEach(router => router.route());
        this.app.listen(port, () => {
            console.log("Listening on port: " + port);
        })
        this.app.use(ErrorHandlerMiddleware.getInstance().handle);
    }
}