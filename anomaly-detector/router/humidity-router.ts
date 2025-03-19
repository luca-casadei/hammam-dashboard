import { NextFunction, Request, Response, Express } from "express";
import GenericRouter from "./interfaces/abstract-router";
import { HUMIDITY_SCHEMAS } from "../validator/schemas/schemas";
import HumidityController from "../controller/humidity-controller";

export default class HumidityRouter extends GenericRouter {

    private readonly controller: HumidityController

    public constructor(app: Express) {
        super(app);
        this.controller = new HumidityController()
    }

    override route(): void {
        this.add();
    }

    private add(): void {
        this.getApp().post("/humidity", (req, res, nf) => this.getValidator().setSchema(HUMIDITY_SCHEMAS.postedHumiditySchema).validate(req, res, nf),
            (req: Request, res: Response, next: NextFunction) => {
                try {
                    console.log(req.body)
                    this.controller.receive(req.body)
                    res.status(200).send("Received");
                } catch (exception: unknown) {
                    next(exception)
                }
            })
    }
}