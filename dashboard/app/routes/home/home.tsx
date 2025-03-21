import type { Route } from "../+types/home";
import "./home.scss"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Readings Dashboard" },
    { name: "description", content: "Welcome to the temperatures and humidity readings dashboard" },
  ];
}

export default function Home() {
  return (
    <main>
      
    </main>
  )
}
