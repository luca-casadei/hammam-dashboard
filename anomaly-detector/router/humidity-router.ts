import { NextFunction, Request, Response, Express } from "express";
import GenericRouter from "./interfaces/abstract-router";
import { HUMIDITY_SCHEMAS, HumidityReading } from "../validator/schemas/schemas";
import Controller from "../controller/controller";

export default class HumidityRouter extends GenericRouter {

    private readonly controller: Controller

    public constructor(app: Express) {
        super(app);
        this.controller = new Controller("humidity")
    }

    override route(): void {
        this.add();
    }

    private add(): void {
        this.getApp().post("/humidity", (req, res, nf) =>
            this.getValidator().setSchema(HUMIDITY_SCHEMAS.postedHumiditySchema)
                .validate(req, res, nf),
            async (req: Request<{}, {}, HumidityReading, {}>, res: Response, next: NextFunction) => {
                try {
                    console.log(req.body)
                    await this.controller.receive({
                        sender: req.body.sender,
                        reading: req.body.humidity
                    })
                    res.status(200).send("Received");
                } catch (exception: unknown) {
                    next(exception)
                }
            })
    }
}