import type { Route } from "./+types/home";
import Welcome from "../welcome/welcome";
import { Names } from "@/models/Names.model";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
export const loader = async () => {
  const names = await Names.find()
  
  return names.map(i=>i.name)
}
export default function Home() {
  return <Welcome />;
}
