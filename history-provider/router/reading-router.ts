import ReadingController from "../controller/reading-controller";
import { FullGetSchema, FullReading, SCHEMAS } from "../validator/schemas/schemas";
import GenericRouter from "./interfaces/abstract-router";
import { Express, NextFunction, Request, Response } from "express"

export default class ReadingRouter extends GenericRouter {
    private readonly controller: ReadingController

    public constructor(app: Express) {
        super(app)
        this.controller = new ReadingController();
    }

    route(): void {
        this.getEveryReading();
    }

    private getEveryReading() {
        this.getApp().get("/",
            (req, res, next) => this.getValidator().setSchema(SCHEMAS.paginationGetSchema).validate(req.query, next),
            async (req: Request<{}, {}, {}, FullGetSchema>, res: Response, next: NextFunction) => {
                try {
                    const records: Array<FullReading> = await this.controller.getAll(req.query);
                    res.status(200).json(records);
                } catch (exception) {
                    next(exception)
                }
            })
    }
}