import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Braj Tourism" },
    { name: "description", content: "Explore the beauty and culture of Braj" },
  ];
}

export default function Home() {
  return <Welcome />;
}
