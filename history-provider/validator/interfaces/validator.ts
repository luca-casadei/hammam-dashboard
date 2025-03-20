import { NextFunction, Request, Response } from "express";

export default interface Validator {
    validate(part: Object, next: NextFunction): void
}