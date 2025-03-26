import Controller from '../controller/controller';
import TresholdProvider from '../controller/tresholds';
import GenericRepo from '../repository/interfaces/abstract-repo';
import { expect, jest, describe, beforeEach, it } from "@jest/globals"
import { FullReading } from '../validator/schemas/schemas';

// Mock the dependencies
jest.mock('../repository/interfaces/abstract-repo');
jest.mock('../controller/tresholds');

describe('Controller', () => {
    let controller: jest.Mocked<Controller>;
    let mockRepo: jest.Mocked<GenericRepo>;

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();

        // Create a mock repository
        mockRepo = new GenericRepo() as jest.Mocked<GenericRepo>;
        mockRepo.init = jest.fn();
        mockRepo.getStandardDeviation = jest.fn();
        mockRepo.getAverage = jest.fn();
        mockRepo.add = jest.fn();

        // Mock TresholdProvider methods
        (TresholdProvider.get as jest.Mock).mockReturnValue({ min: 10, max: 30 });
        (TresholdProvider.getForScore as jest.Mock).mockReturnValue(2);

        // Use constructor to create controller
        controller = new Controller('temperature') as jest.Mocked<Controller>;
        (controller as any)["repo"] = mockRepo
    });

    describe('receive method', () => {
        it('should add reading with correct calculations', async () => {
            // Setup mock return values
            mockRepo.getStandardDeviation.mockResolvedValue(5);
            mockRepo.getAverage.mockResolvedValue(20);

            const reading = { reading: 25, sender: 'sensor1' };
            await controller.receive(reading);

            // Verify calculations
            expect(mockRepo.getStandardDeviation).toHaveBeenCalledWith('temperature');
            expect(mockRepo.getAverage).toHaveBeenCalledWith('temperature');

            // Check the added reading
            const addedReading = (mockRepo.add as jest.Mock).mock.calls[0][0];
            expect(addedReading).toMatchObject({
                reading: 25,
                sender: 'sensor1',
                type: 'temperature',
                inThreshold: true,
                deviation: 5,
                score: 1,
                inScoreTreshold: true
            });
        });

        it('should handle zero standard deviation', async () => {
            // Setup mock return values
            mockRepo.getStandardDeviation.mockResolvedValue(0);
            mockRepo.getAverage.mockResolvedValue(20);

            const reading = { reading: 25, sender: 'sensor1' };
            await controller.receive(reading);

            // Check the added reading
            const addedReading = (mockRepo.add as jest.Mock).mock.calls[0][0];
            expect((addedReading as FullReading).score).toBe(0);
        });

        it('should mark reading as out of threshold', async () => {
            // Setup mock return values
            mockRepo.getStandardDeviation.mockResolvedValue(5);
            mockRepo.getAverage.mockResolvedValue(20);

            const reading = { reading: 35, sender: 'sensor1' };
            await controller.receive(reading);

            // Check the added reading
            const addedReading = (mockRepo.add as jest.Mock).mock.calls[0][0];
            expect((addedReading as FullReading).inThreshold).toBe(false);
            expect((addedReading as FullReading).inScoreTreshold).toBe(false);
        });
    });
});