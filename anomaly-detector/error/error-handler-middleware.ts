import { Request, NextFunction, Response } from "express";
import { ZodError } from "zod";
import ErrorHandler from "./error-handler";

export default class ErrorHandlerMiddleware implements ErrorHandler {
    private static instance: ErrorHandlerMiddleware;
    private constructor() {
        this.handle = async (err: unknown, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof ZodError) {
                res.status(400).json({
                    issues: err.flatten()
                });
                next();
                return
            }
            next();
            return;
        }
    }
    public static getInstance() {
        if (ErrorHandlerMiddleware.instance === undefined) {
            ErrorHandlerMiddleware.instance = new ErrorHandlerMiddleware();
        }
        return ErrorHandlerMiddleware.instance;
    }
    public readonly handle: (err: unknown, req: Request, res: Response, next: NextFunction) => Promise<void>
}