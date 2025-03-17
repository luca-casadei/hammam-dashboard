import { NextFunction, Request, Response, Express } from "express";
import GenericRouter from "./abstract-router";
import { TEMPERATURE_SCHEMAS } from "../validator/schemas/schemas";

export default class TemperatureRouter extends GenericRouter {
    public constructor(app: Express) {
        super(app);
    }

    route(): void {
        this.getReadTemperatureFromClient();
    }

    private getReadTemperatureFromClient(): void {
        this.getApp().post("/temperature", (req, res, next) => this.getValidator().setSchema(TEMPERATURE_SCHEMAS.postedTemperatureSchema).validate(req, res, next),
            (req: Request, res: Response, next: NextFunction) => {
                console.log(req.body);
                res.status(200).send("Received");
            })
    }
}