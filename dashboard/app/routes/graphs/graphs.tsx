import type { Route } from "../+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Readings Graphs" },
    { name: "description", content: "Here you can view some graphs of the read values." },
  ];
}

export default function Graphs() {
    return (
        <main>
            
        </main>
    );
}