export default abstract class GenericRepo {
    private readonly collectionName: string

    protected constructor(name: string) {
        this.collectionName = name;
    }

    protected getName(): string {
        return this.collectionName
    }
}