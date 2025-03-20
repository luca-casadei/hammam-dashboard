import { Request, Response, NextFunction } from "express";
import z, { ZodObject, ZodRawShape, ZodSchema } from "zod"
import Validator from "../interfaces/validator";


export default class ValidatorMiddleware implements Validator {
    private zodSchema: ZodSchema;

    public constructor() {
        this.zodSchema = z.object({});
    }

    public validate(part: Object, next: NextFunction): void {
        const parsed: unknown = this.zodSchema.parse(part);
        Object.assign(part, parsed);
        next();
    }

    public setSchema(zodSchema: ZodSchema): Validator {
        this.zodSchema = zodSchema;
        return this;
    }
}