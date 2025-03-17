import { NextFunction, Request, Response } from "express";

export default interface ErrorHandler{
    handle: (err: unknown, req: Request, res: Response, next: NextFunction) => Promise<void>
}