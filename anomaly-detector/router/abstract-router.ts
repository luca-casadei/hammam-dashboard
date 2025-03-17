import ValidatorMiddleware from "../validator/validator-middleware";
import Router from "./router";
import { Express } from "express"


export default abstract class GenericRouter implements Router {
    private app: Express;
    private readonly validator: ValidatorMiddleware;
    protected constructor(app: Express) {
        this.app = app;
        this.validator = new ValidatorMiddleware();
    }
    protected getApp(): Express {
        return this.app;
    }
    protected getValidator(): ValidatorMiddleware {
        return this.validator;
    }
    abstract route(): void
}