import { Request, Response, Express } from "express";
import GenericRouter from "./interfaces/abstract-router";
import { TEMPERATURE_SCHEMAS } from "../validator/schemas/schemas";
import TemperatureController from "../controller/temperature-controller";

export default class TemperatureRouter extends GenericRouter {

    private readonly controller: TemperatureController

    public constructor(app: Express) {
        super(app);
        this.controller = new TemperatureController()
    }

    override route(): void {
        this.add();
    }

    private add(): void {
        this.getApp().post("/temperature", (req, res, next) => this.getValidator().setSchema(TEMPERATURE_SCHEMAS.postedTemperatureSchema).validate(req, res, next),
            (req: Request, res: Response) => {
                console.log(req.body)
                this.controller.receive(req.body)
                res.status(200).send("Received");
            })
    }
}