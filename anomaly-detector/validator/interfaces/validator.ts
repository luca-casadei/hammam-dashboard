import { NextFunction, Request, Response } from "express";

export default interface Validator {
    validate(req: Request, res: Response, next: NextFunction): void
}