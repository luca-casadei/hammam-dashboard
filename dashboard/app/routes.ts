import { type RouteConfig, index, route } from "@react-router/dev/routes";

type FullRoute = {
    route: string,
    path: string,
    display: string,
}

export const routes: FullRoute[] = [
    { route: "/", path: "routes/home/home.tsx", display: "Home" },
    { route: "/graphs", path: "routes/graphs/graphs.tsx", display: "Graphs" },
];

export default routes.map(r => {
    if (r.route === "/") {
        return index(r.path);
    }
    else {
        return route(r.route, r.path);
    }
}) satisfies RouteConfig;
