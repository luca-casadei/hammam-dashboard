import ReadingRepository from "../repository/reading";
import { FullGetSchema, FullReading } from "../validator/schemas/schemas";

export default class ReadingController {
    private readonly repo: ReadingRepository
    public constructor() {
        this.repo = new ReadingRepository()
    }
    public async getAll(request: FullGetSchema): Promise<Array<FullReading>> {
        return await this.repo.getEveryReading(request.page ?? 1, request.limit ?? 50, request.type, request.ascending, request.from, request.to);
    }
}