import type { FullReading, MetaReading } from "~/types/readings";

export default class HTTPClient {
    private readonly baseUrl: string;
    constructor(hostname?: string, port?: number) {
        this.baseUrl = "http://" + (hostname ?? "localhost") + ":" + (port ?? import.meta.env.VITE_GATEWAY_PORT) + "/history";
    }
    public async getReadings(): Promise<MetaReading> {
        const response: Response = await fetch(this.baseUrl);
        const json : MetaReading = await response.json()
        return json;
    }
}