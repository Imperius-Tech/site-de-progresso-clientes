import type { Project, Phase, Task } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle2,
  Clock,
  CalendarDays,
  Layers,
} from 'lucide-react';
import { useMemo, useState } from 'react';

/* ── helpers ── */

const statusLabel: Record<string, string> = {
  em_andamento: 'Em andamento',
  concluido: 'Concluído',
  concluida: 'Concluída',
  pausado: 'Pausado',
  pendente: 'Pendente',
  impedida: 'Impedida',
};

const taskBadgeClass: Record<Task['status'], string> = {
  concluida: 'bg-phase-delivery/10 text-phase-delivery border-phase-delivery/20',
  em_andamento: 'bg-phase-planning/10 text-phase-planning border-phase-planning/20',
  pendente: 'bg-muted text-muted-foreground border-border',
  impedida: 'bg-destructive/10 text-destructive border-destructive/20',
};

const phaseColor: Record<string, string> = {
  planning: 'var(--phase-planning)',
  development: 'var(--phase-development)',
  quality: 'var(--phase-quality)',
  delivery: 'var(--phase-delivery)',
};

const phaseBadgeClass: Record<string, string> = {
  planning: 'bg-phase-planning/10 text-phase-planning border-phase-planning/20',
  development: 'bg-phase-development/10 text-phase-development border-phase-development/20',
  quality: 'bg-phase-quality/10 text-phase-quality border-phase-quality/20',
  delivery: 'bg-phase-delivery/10 text-phase-delivery border-phase-delivery/20',
};

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });
}

function daysUntil(iso: string) {
  const diff = new Date(iso + 'T00:00:00').getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86400000));
}

/* ── component ── */

export function ProjectPage({ project }: { project: Project }) {
  const allTasks = useMemo(() => project.phases.flatMap((p) => p.tasks), [project]);
  const doneTasks = useMemo(() => allTasks.filter((t) => t.status === 'concluida'), [allTasks]);
  const pct = allTasks.length ? Math.round((doneTasks.length / allTasks.length) * 100) : 0;

  const currentPhase = useMemo(
    () => project.phases.find((p) => p.status === 'em_andamento') ?? project.phases[0],
    [project]
  );

  const nextDeadline = useMemo(() => {
    const pending = allTasks
      .filter((t) => t.status !== 'concluida')
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    return pending[0]?.dueDate;
  }, [allTasks]);

  const remaining = daysUntil(project.estimatedEndDate);

  const [showAll, setShowAll] = useState(false);

  const sortedTasks = useMemo(() => {
    const order: Record<Task['status'], number> = {
      em_andamento: 0,
      impedida: 1,
      pendente: 2,
      concluida: 3,
    };
    return [...allTasks].sort(
      (a, b) => order[a.status] - order[b.status] || a.dueDate.localeCompare(b.dueDate)
    );
  }, [allTasks]);

  const visibleTasks = showAll ? sortedTasks : sortedTasks.slice(0, 10);

  return (
    <div
      className="min-h-screen bg-landing-bg"
      style={{
        backgroundImage: `radial-gradient(circle, var(--landing-grid) 1.2px, transparent 1.2px)`,
        backgroundSize: '24px 24px',
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-landing-bg/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <img src="/images/imperius-logo.png" alt="Imperius Tech" className="h-7" />
          <span className="hidden text-sm font-medium text-foreground sm:block">{project.projectName}</span>
          <Badge variant="outline" className={project.status === 'em_andamento' ? 'bg-phase-planning/10 text-phase-planning border-phase-planning/20' : 'bg-muted text-muted-foreground'}>
            {statusLabel[project.status]}
          </Badge>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Hero */}
        <section className="mb-10 text-center">
          {project.logoUrl && (
            <img src={project.logoUrl} alt={project.clientName} className="mx-auto mb-4 h-14 rounded-xl object-contain" />
          )}
          <h1 className="font-serif text-3xl font-bold tracking-tight text-landing-dark md:text-4xl">
            {project.projectName}
          </h1>
          <p className="mt-1 text-base text-landing-light-muted">{project.clientName}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Acompanhe em tempo real o progresso do seu projeto
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span>Início: <strong className="text-foreground">{formatDate(project.startDate)}</strong></span>
            <span>Previsão: <strong className="text-foreground">{formatDate(project.estimatedEndDate)}</strong></span>
          </div>
        </section>

        {/* Overall progress */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">Progresso geral</span>
              <span className="font-semibold text-foreground">{pct}%</span>
            </div>
            <Progress value={pct} className="h-3" />
            <p className="mt-2 text-xs text-muted-foreground">
              {doneTasks.length} de {allTasks.length} tarefas concluídas
            </p>
          </CardContent>
        </Card>

        {/* Summary cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <SummaryCard icon={<CheckCircle2 className="h-5 w-5 text-phase-delivery" />} label="Tarefas concluídas" value={`${doneTasks.length}`} sub={`de ${allTasks.length} total`} />
          <SummaryCard icon={<Layers className="h-5 w-5 text-phase-development" />} label="Fase atual" value={currentPhase.name} />
          <SummaryCard icon={<CalendarDays className="h-5 w-5 text-phase-quality" />} label="Próximo prazo" value={nextDeadline ? formatDate(nextDeadline) : '—'} />
          <SummaryCard icon={<Clock className="h-5 w-5 text-phase-planning" />} label="Dias restantes" value={`${remaining}`} />
        </div>

        {/* Phase progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-base">Progresso por fase</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {project.phases.map((phase) => (
              <PhaseBar key={phase.id} phase={phase} />
            ))}
          </CardContent>
        </Card>

        {/* Task list */}
        <Card className="mb-10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Tarefas do projeto</CardTitle>
            {allTasks.length > 10 && (
              <button onClick={() => setShowAll(!showAll)} className="text-xs font-medium text-phase-planning hover:underline">
                {showAll ? 'Mostrar menos' : 'Ver todas →'}
              </button>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="px-6 py-3 font-medium">Tarefa</th>
                    <th className="hidden px-6 py-3 font-medium sm:table-cell">Fase</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="hidden px-6 py-3 font-medium md:table-cell">Prazo</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleTasks.map((task) => (
                    <tr key={task.id} className="border-b border-border last:border-0">
                      <td className="px-6 py-3">
                        <span className="font-medium text-foreground">{task.title}</span>
                        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{task.description}</p>
                      </td>
                      <td className="hidden px-6 py-3 sm:table-cell">
                        <span className="text-xs text-muted-foreground">
                          {project.phases.find((p) => p.id === task.phase)?.name}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <Badge variant="outline" className={taskBadgeClass[task.status]}>
                          {statusLabel[task.status]}
                        </Badge>
                      </td>
                      <td className="hidden px-6 py-3 text-xs text-muted-foreground md:table-cell">
                        {formatDate(task.dueDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Phase detail cards */}
        <section className="mb-16">
          <div className="mb-6 text-center">
            <h2 className="font-serif text-2xl font-bold text-landing-dark">Fases do projeto</h2>
            <p className="mt-1 text-sm text-muted-foreground">Tudo que será entregue, passo a passo</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {project.phases.map((phase) => (
              <PhaseCard key={phase.id} phase={phase} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6 text-center text-xs text-landing-light-muted">
        Desenvolvido por <span className="font-medium text-landing-dark">Imperius Tech</span> · {new Date().getFullYear()}
      </footer>
    </div>
  );
}

/* ── sub-components ── */

function SummaryCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2 p-5">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-xl font-bold text-foreground">{value}</span>
        {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
      </CardContent>
    </Card>
  );
}

function PhaseBar({ phase }: { phase: Phase }) {
  const done = phase.tasks.filter((t) => t.status === 'concluida').length;
  const pct = phase.tasks.length ? Math.round((done / phase.tasks.length) * 100) : 0;
  const color = phaseColor[phase.id] ?? 'var(--primary)';

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">{phase.name}</span>
          {phase.status === 'em_andamento' && (
            <Badge variant="outline" className={phaseBadgeClass[phase.id]}>Em andamento</Badge>
          )}
        </div>
        <span className="text-xs text-muted-foreground">{pct}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function PhaseCard({ phase }: { phase: Phase }) {
  const done = phase.tasks.filter((t) => t.status === 'concluida').length;
  const pct = phase.tasks.length ? Math.round((done / phase.tasks.length) * 100) : 0;
  const color = phaseColor[phase.id] ?? 'var(--primary)';

  return (
    <Card>
      <CardContent className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">{phase.name}</h3>
          <Badge variant="outline" className={phaseBadgeClass[phase.id]}>
            {statusLabel[phase.status]}
          </Badge>
        </div>
        {phase.startDate && phase.endDate && (
          <p className="mb-3 text-xs text-muted-foreground">
            {formatDate(phase.startDate)} — {formatDate(phase.endDate)}
          </p>
        )}
        <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
        </div>
        <ul className="space-y-1.5">
          {phase.tasks.map((task) => (
            <li key={task.id} className="flex items-center gap-2 text-xs">
              <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${task.status === 'concluida' ? 'bg-phase-delivery' : task.status === 'em_andamento' ? 'bg-phase-planning' : task.status === 'impedida' ? 'bg-destructive' : 'bg-muted-foreground/30'}`} />
              <span className={task.status === 'concluida' ? 'text-muted-foreground line-through' : 'text-foreground'}>{task.title}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
