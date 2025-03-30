import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { routes } from "./customRoutes"

export default routes.map(r => {
    if (r.route === "/") {
        return index(r.path);
    }
    else {
        return route(r.route, r.path);
    }
}) satisfies RouteConfig;
