export default interface QueryBuilder {
    addType(type: string): void;
    addTimeFrom(from: Date): void;
    addTimeTo(to: Date): void;
    addPagination(page: number, limit: number): void;
    addSorting(ascending: boolean): void;
    reset(): void;
}