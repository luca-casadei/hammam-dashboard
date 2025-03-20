export default abstract class Repository {
    private readonly collectionName: string;
    protected constructor() {
        this.collectionName = "readings"
    }
    protected getName(): string {
        return this.collectionName;
    }
}