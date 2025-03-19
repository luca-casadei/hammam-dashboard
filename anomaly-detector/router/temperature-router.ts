import { Request, Response, Express, NextFunction } from "express";
import GenericRouter from "./interfaces/abstract-router";
import { TEMPERATURE_SCHEMAS, TemperatureReading } from "../validator/schemas/schemas";
import Controller from "../controller/controller";

export default class TemperatureRouter extends GenericRouter {

    private readonly controller: Controller

    public constructor(app: Express) {
        super(app);
        this.controller = new Controller("temperature")
    }

    override route(): void {
        this.add();
    }

    private add(): void {
        this.getApp().post("/temperature",
            (req: Request, res: Response, next: NextFunction) =>
                this.getValidator().setSchema(TEMPERATURE_SCHEMAS.postedTemperatureSchema)
                    .validate(req, res, next),
            async (req: Request<{}, {}, TemperatureReading, {}>, res: Response) => {
                console.log(req.body)
                await this.controller.receive({
                    reading: req.body.temperature,
                    sender: req.body.sender
                })
                res.status(200).send("Received");
            })
    }
}