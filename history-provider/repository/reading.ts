import { Document } from "mongodb";
import { FullReading, MetaReading } from "../validator/schemas/schemas";
import DbConnector from "./connector";
import Repository from "./interfaces/abstract-repository";
import ReadingsPipelineBuilder from "./pipeline/mongo-pipeline-builder";

export default class ReadingRepository extends Repository {
    public constructor() {
        super();
    }
    public async getEveryReading(page: number,
        limit: number,
        type?: string,
        ascending?: boolean,
        from?: Date,
        to?: Date): Promise<MetaReading> {
        const client = DbConnector.getInstance().getClient();
        const pBuilder: ReadingsPipelineBuilder = new ReadingsPipelineBuilder();
        if (type) {
            pBuilder.addFiltering(type);
        }
        if (ascending !== undefined) {
            pBuilder.addSorting(ascending)
        }
        if (from){
            pBuilder.addIntervalFrom(from);
        }
        if (to){
            pBuilder.addIntervalTo(to);
        }
        pBuilder.addPagination(page, limit);
        const results = (await client.db().collection<MetaReading>(this.getName()).aggregate(pBuilder.build() as Document[]).toArray()) as MetaReading[]
        return results[0];
    }
}