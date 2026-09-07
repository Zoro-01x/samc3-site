import { redirect } from "next/navigation";

export const metadata = {
  title: "Projects — redirects to Systems",
};

export default function ProjectsPage() {
  redirect("/systems");
}
