import Router from "./router";

export default class RouterCollection {
    private readonly routers: Router[]

    constructor(routerArray?: Router[]) {
        this.routers = []
        if (routerArray !== undefined) {
            routerArray.forEach(router => {
                this.routers.push(router);
            })
        }
    }

    public getRouters(): ReadonlyArray<Router>{
        return this.routers as ReadonlyArray<Router>;
    }

    public addRouter(router: Router): void {
        this.routers.push(router);
    }
}