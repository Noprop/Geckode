import projectsApi from "@/lib/api/projects";
import { Project } from "@/lib/types/projects";

export default async function ProjectsPage() {
  const projects: Project[] = await projectsApi
    .list()
    .then((res) => res.results);

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
}
