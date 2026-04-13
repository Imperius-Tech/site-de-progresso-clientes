import { Link } from '@tanstack/react-router';
import { getAllProjects, type Project } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const statusLabel: Record<Project['status'], string> = {
  em_andamento: 'Em andamento',
  concluido: 'Concluído',
  pausado: 'Pausado',
};

const statusClass: Record<Project['status'], string> = {
  em_andamento: 'bg-phase-planning/10 text-phase-planning border-phase-planning/20',
  concluido: 'bg-phase-delivery/10 text-phase-delivery border-phase-delivery/20',
  pausado: 'bg-muted text-muted-foreground border-border',
};

export function ImperiusLanding() {
  const projects = getAllProjects();

  return (
    <div
      className="flex min-h-screen flex-col bg-landing-bg"
      style={{
        backgroundImage: `radial-gradient(circle, var(--landing-grid) 1.2px, transparent 1.2px)`,
        backgroundSize: '24px 24px',
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-center px-6 py-8">
        <img src="/images/imperius-logo.png" alt="Imperius Tech" className="h-10" />
      </header>

      {/* Hero */}
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center px-6 pt-12 pb-24">
        <h1 className="text-center font-serif text-4xl font-bold tracking-tight text-landing-dark md:text-5xl">
          Acompanhe seu projeto
        </h1>
        <p className="mt-4 max-w-md text-center text-sm text-landing-light-muted">
          Veja o progresso em tempo real dos projetos desenvolvidos pela Imperius Tech.
        </p>

        {/* Project list */}
        <div className="mt-12 flex w-full flex-col gap-4">
          {projects.map((project) => {
            const allTasks = project.phases.flatMap((p) => p.tasks);
            const done = allTasks.filter((t) => t.status === 'concluida').length;
            const pct = allTasks.length ? Math.round((done / allTasks.length) * 100) : 0;

            return (
              <Link
                key={project.slug}
                to="/$slug"
                params={{ slug: project.slug }}
                className="group"
              >
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center gap-4 p-5">
                    {project.logoUrl && (
                      <img
                        src={project.logoUrl}
                        alt={project.clientName}
                        className="h-10 w-10 rounded-lg object-contain"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{project.projectName}</span>
                        <Badge variant="outline" className={statusClass[project.status]}>
                          {statusLabel[project.status]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.clientName}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground">{pct}%</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6 text-center text-xs text-landing-light-muted">
        Desenvolvido por <span className="font-medium text-landing-dark">Imperius Tech</span> · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
