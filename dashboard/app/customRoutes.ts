export type FullRoute = {
    route: string,
    path: string,
    display: string,
}

export const routes: FullRoute[] = [
    { route: "/", path: "routes/home/home.tsx", display: "Home" },
    { route: "/graphs", path: "routes/graphs/graphs.tsx", display: "Graphs" },
];