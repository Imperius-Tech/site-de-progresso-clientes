import { createFileRoute } from '@tanstack/react-router';
import { getProject } from '@/data/projects';
import { ProjectPage } from '@/components/project-page';

export const Route = createFileRoute('/$slug')({
  head: ({ params }) => {
    const project = getProject(params.slug);
    const title = project ? `${project.projectName} — ${project.clientName}` : 'Projeto não encontrado';
    return {
      meta: [
        { title },
        { name: 'description', content: project ? `Acompanhe o progresso do projeto ${project.projectName}` : 'Projeto não encontrado' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: project ? `Acompanhe o progresso do projeto ${project.projectName}` : 'Projeto não encontrado' },
      ],
    };
  },
  component: ProjectSlugPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-landing-bg">
      <p className="text-muted-foreground">Projeto não encontrado</p>
    </div>
  ),
});

function ProjectSlugPage() {
  const { slug } = Route.useParams();
  const project = getProject(slug);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-landing-bg">
        <p className="text-muted-foreground">Projeto não encontrado</p>
      </div>
    );
  }

  return <ProjectPage project={project} />;
}
