export default interface PipelineBuilder {
    addPagination(page: number, limit: number): void
    addSorting(ascending: boolean): void
    addFiltering(type: string): void
    addIntervalFrom(from: Date): void
    addIntervalTo(to: Date): void
    reset(): void
}