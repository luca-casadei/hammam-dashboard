import type QueryBuilder from "./QueryBuilder";

export default class HTTPQueryBuilder implements QueryBuilder {
    private query: string = "?";
    
    addType(type: string): void {
        this.query += `type=${type}&`
    }
    addTimeFrom(from: Date): void {
        this.query += `from=${from.toISOString()}&`
    }
    addTimeTo(to: Date): void {
        this.query += `to=${to.toISOString()}&`
    }
    addPagination(page: number, limit: number): void {
        this.query += `page=${page}&limit=${limit}&`
    }
    addSorting(ascending: boolean): void {
        this.query += `ascending=${ascending}&`
    }
    reset(): void {
        this.query = "?"
    }

    build(): string {
        const q = this.query
        this.reset();
        return q;
    }

}