import { Request, Response, NextFunction } from "express";
import z, { ZodObject, ZodRawShape, ZodSchema } from "zod"
import Validator from "../interfaces/validator";


export default class ValidatorMiddleware implements Validator {
    private zodSchema: ZodSchema;

    public constructor() {
        this.zodSchema = z.object({});
    }

    public validate(req: Request, res: Response, next: NextFunction): void {
        const parsed: unknown = this.zodSchema.parse(req.body);
        Object.assign(req.body, parsed);
        next();
    }

    public setSchema(zodSchema: ZodSchema): Validator {
        this.zodSchema = zodSchema;
        return this;
    }
}