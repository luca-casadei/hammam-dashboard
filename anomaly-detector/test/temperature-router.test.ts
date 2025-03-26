import TemperatureRouter from '../router/temperature-router';
import { describe, beforeEach, jest, expect, it } from "@jest/globals"
import {Express} from "express"

// Mock dependencies
jest.mock('../controller/controller');
jest.mock('express');

import Controller from '../controller/controller';

describe('TemperatureRouter', () => {
    let mockApp: jest.Mocked<Express> = {
        post: jest.fn()
    } as any;
    let mockValidator: {
        setSchema: jest.Mock,
        validate: jest.Mock
    };
    let temperatureRouter: TemperatureRouter;

    beforeEach(() => {
        // Create mock implementations
        mockValidator = {
            setSchema: jest.fn().mockReturnThis(),
            validate: jest.fn(),
        };
        mockApp.post.mockReturnThis()
        temperatureRouter = new TemperatureRouter(mockApp);
    });

    it('should create router with temperature controller', () => {
        expect(temperatureRouter['controller']).toBeInstanceOf(Controller);
    });

    it('should setup route during routing', () => {
        temperatureRouter.route()
        expect(mockApp.post).toHaveBeenCalledWith(
            "/temperature",
            expect.any(Function), // Validator middleware
            expect.any(Function)  // Handler middleware
        );
    });
})