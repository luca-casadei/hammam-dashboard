import { Document } from "mongodb";
import PipelineBuilder from "./pipeline-bulder";

export default class ReadingsPipelineBuilder implements PipelineBuilder {

    private pipeline: Document[];

    public constructor() {
        this.pipeline = []
    }

    public addIntervalFrom(from: Date): void {
        this.pipeline.push({
            $match: {
                readingDateTime: {
                    $gte: from
                }
            }
        })
    }

    public addIntervalTo(to: Date): void {
        this.pipeline.push({
            $match: {
                readingDateTime: {
                    $lte: to
                }
            }
        })
    }

    public addFiltering(type: string): void {
        this.pipeline.push({
            $match: {
                type: type
            }
        })
    }

    public addPagination(page: number, limit: number): void {
        this.pipeline.push({
            $facet: {
                meta: [{ $count: 'totalCount' }],
                data: [{ $skip: (page - 1) * limit }, { $limit: limit }]
            }
        })
    }

    public addSorting(ascending: boolean): void {
        this.pipeline.push({
            $sort: {
                readingDateTime: (ascending ? 1 : -1)
            }
        })
    }

    public build(): readonly Document[] {
        const returning: readonly Document[] = this.pipeline;
        this.reset()
        return returning;
    }

    reset(): void {
        this.pipeline = []
    }

}