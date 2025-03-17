import { NextFunction, Request, Response, Express } from "express";
import GenericRouter from "./abstract-router";
import { HUMIDITY_SCHEMAS, TEMPERATURE_SCHEMAS } from "../validator/schemas/schemas";

export default class HumidityRouter extends GenericRouter {


    public constructor(app: Express) {
        super(app);
    }

    route(): void {
        this.getHumidityFromClient();
    }

    private getHumidityFromClient(): void {
        this.getApp().post("/humidity", (req, res, nf) => this.getValidator().setSchema(HUMIDITY_SCHEMAS.postedHumiditySchema).validate(req, res, nf),
            (req: Request, res: Response, next: NextFunction) => {
                try {
                    console.log(req.body);
                    res.status(200).send("Received");
                } catch (exception: unknown) {
                    next(exception)
                }
            })
    }
}