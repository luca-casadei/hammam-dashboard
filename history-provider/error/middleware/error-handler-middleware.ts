import { Request, NextFunction, Response } from "express";
import { ZodError } from "zod";
import ErrorHandler from "../error-handler";
import { MongoServerError } from "mongodb";
import Repository from "../../repository/repository";

export default class ErrorHandlerMiddleware implements ErrorHandler {
    private static instance: ErrorHandlerMiddleware;
    public readonly handle: (err: unknown, req: Request, res: Response, next: NextFunction) => Promise<void>
    private constructor() {
        this.handle = async (err: unknown, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof ZodError) {
                res.status(400).json({
                    issues: err.flatten()
                });
                next();
                return
            }
            if (err instanceof MongoServerError){
                res.status(500).send("There was an error connecting to the database.\n" + err.message);
                Repository.getInstance().getClient().close();
                next();
                return;
            }
            throw err
        }
    }
    public static getInstance() {
        if (ErrorHandlerMiddleware.instance === undefined) {
            ErrorHandlerMiddleware.instance = new ErrorHandlerMiddleware();
        }
        return ErrorHandlerMiddleware.instance;
    }
}