export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pendente" | "em_andamento" | "concluida" | "impedida";
  dueDate: string;
  completedAt?: string;
  phase: string;
}

export interface Phase {
  id: string;
  name: string;
  order: number;
  status: "pendente" | "em_andamento" | "concluida";
  startDate?: string;
  endDate?: string;
  tasks: Task[];
}

export interface Project {
  slug: string;
  clientName: string;
  projectName: string;
  logoUrl?: string;
  startDate: string;
  estimatedEndDate: string;
  status: "em_andamento" | "concluido" | "pausado";
  phases: Phase[];
}

const projects: Project[] = [
  {
    slug: "buyate",
    clientName: "Buyate Contabilidade",
    projectName: "Sistema AI-First",
    logoUrl: "/images/buyate-logo.jpeg",
    startDate: "2026-04-11",
    estimatedEndDate: "2026-07-11",
    status: "em_andamento",
    phases: [
      {
        id: "planning",
        name: "Planejamento",
        order: 1,
        status: "em_andamento",
        startDate: "2026-04-11",
        endDate: "2026-04-25",
        tasks: [
          { id: "P01", title: "Criar projeto e definir instruções", description: "Projeto criado com instruções e knowledge base", status: "concluida", dueDate: "2026-04-11", completedAt: "2026-04-11", phase: "planning" },
          { id: "P02", title: "Definir escopo técnico", description: "Arquitetura 3 camadas aprovada, stack definida", status: "concluida", dueDate: "2026-04-11", completedAt: "2026-04-11", phase: "planning" },
          { id: "P03", title: "Gerar lista de tarefas completa", description: "77 tarefas divididas em 4 blocos com prazos", status: "concluida", dueDate: "2026-04-11", completedAt: "2026-04-11", phase: "planning" },
          { id: "P04", title: "Apresentar comparativo de ERP", description: "Comparativo Domínio vs Omie+OneFlow para aprovação", status: "pendente", dueDate: "2026-04-15", phase: "planning" },
          { id: "P05", title: "Cotar OneFlow com comercial", description: "Proposta para ~90 clientes Simples + Presumido + Real", status: "pendente", dueDate: "2026-04-18", phase: "planning" },
          { id: "P06", title: "Contratar servidor", description: "VPS para o agente inteligente (2 cores, 4GB RAM)", status: "pendente", dueDate: "2026-04-16", phase: "planning" },
          { id: "P07", title: "Configurar banco de dados", description: "Supabase Pro com extensões necessárias", status: "pendente", dueDate: "2026-04-16", phase: "planning" },
          { id: "P08", title: "Criar repositório do código", description: "GitHub monorepo com estrutura completa", status: "pendente", dueDate: "2026-04-17", phase: "planning" },
          { id: "P09", title: "Setup do frontend", description: "Projeto Lovable conectado ao repositório", status: "pendente", dueDate: "2026-04-17", phase: "planning" },
          { id: "P10", title: "Configurar hospedagem", description: "Cloudflare Pages com deploy automático", status: "pendente", dueDate: "2026-04-18", phase: "planning" },
          { id: "P11", title: "Obter chaves de API", description: "Maritaca, Anthropic, Qive, NF-Stock, Omie, Supabase", status: "pendente", dueDate: "2026-04-20", phase: "planning" },
          { id: "P12", title: "Montar calendário fiscal", description: "Todas as obrigações com prazos e regimes", status: "pendente", dueDate: "2026-04-22", phase: "planning" },
        ],
      },
      {
        id: "development",
        name: "Desenvolvimento",
        order: 2,
        status: "pendente",
        startDate: "2026-04-26",
        endDate: "2026-06-20",
        tasks: [
          { id: "D01", title: "Schema do banco de dados", description: "Tabelas de usuários, clientes, tarefas, documentos", status: "pendente", dueDate: "2026-04-28", phase: "development" },
          { id: "D02", title: "Login e controle de acesso", description: "Autenticação com níveis hierárquicos", status: "pendente", dueDate: "2026-04-30", phase: "development" },
          { id: "D03", title: "Tela de login", description: "Interface mobile-first", status: "pendente", dueDate: "2026-05-02", phase: "development" },
          { id: "D04", title: "Instalar agente inteligente", description: "OpenClaw configurado na VPS 24/7", status: "pendente", dueDate: "2026-05-02", phase: "development" },
          { id: "D05", title: "Conectar WhatsApp", description: "Canal de comunicação via WhatsApp", status: "pendente", dueDate: "2026-05-04", phase: "development" },
          { id: "D06", title: "Chat do agente no painel", description: "Interface de chat web integrada", status: "pendente", dueDate: "2026-05-05", phase: "development" },
          { id: "D07", title: "Agente responde por nível", description: "Admin vê tudo, operacional vê só suas tarefas", status: "pendente", dueDate: "2026-05-09", phase: "development" },
          { id: "D08", title: "Tutorial visual com prints", description: "Funcionário tira print, agente ensina passo-a-passo", status: "pendente", dueDate: "2026-05-12", phase: "development" },
          { id: "D09", title: "Sistema de tarefas (Kanban)", description: "Quadro de tarefas por departamento", status: "pendente", dueDate: "2026-05-23", phase: "development" },
          { id: "D10", title: "Envio automático de guias", description: "Guias DAS enviadas por WhatsApp", status: "pendente", dueDate: "2026-06-01", phase: "development" },
          { id: "D11", title: "Importação de notas fiscais", description: "Integração com Qive API", status: "pendente", dueDate: "2026-06-09", phase: "development" },
          { id: "D12", title: "Classificação de notas com IA", description: "CFOP/NCM/CST classificados automaticamente", status: "pendente", dueDate: "2026-06-12", phase: "development" },
          { id: "D13", title: "Consulta de legislação (IA)", description: "Busca inteligente na legislação tributária", status: "pendente", dueDate: "2026-06-16", phase: "development" },
          { id: "D14", title: "Monitor de certidões", description: "Alerta automático de vencimentos", status: "pendente", dueDate: "2026-06-19", phase: "development" },
          { id: "D15", title: "Dashboard fiscal", description: "SLA, atrasos, performance por pessoa", status: "pendente", dueDate: "2026-06-20", phase: "development" },
        ],
      },
      {
        id: "quality",
        name: "Qualidade",
        order: 3,
        status: "pendente",
        startDate: "2026-06-22",
        endDate: "2026-07-04",
        tasks: [
          { id: "Q01", title: "Auditoria de segurança", description: "Verificar que cada pessoa só vê o que pode ver", status: "pendente", dueDate: "2026-06-22", phase: "quality" },
          { id: "Q02", title: "Proteção de dados (LGPD)", description: "Política de retenção e exclusão de dados", status: "pendente", dueDate: "2026-06-24", phase: "quality" },
          { id: "Q03", title: "Otimização de custos de IA", description: "Garantir custo médio abaixo de R$ 0,05/mensagem", status: "pendente", dueDate: "2026-06-27", phase: "quality" },
          { id: "Q04", title: "Teste no celular", description: "Validar toda experiência mobile", status: "pendente", dueDate: "2026-06-30", phase: "quality" },
          { id: "Q05", title: "Manual da gestora", description: "Guia com prints para Cristiane e Alessandra", status: "pendente", dueDate: "2026-07-01", phase: "quality" },
          { id: "Q06", title: "Manual do funcionário", description: "Guia simples para equipe operacional", status: "pendente", dueDate: "2026-07-02", phase: "quality" },
          { id: "Q07", title: "Documentação técnica", description: "Arquitetura, deploy, procedimentos de incidente", status: "pendente", dueDate: "2026-07-04", phase: "quality" },
        ],
      },
      {
        id: "delivery",
        name: "Entrega",
        order: 4,
        status: "pendente",
        startDate: "2026-07-05",
        endDate: "2026-07-11",
        tasks: [
          { id: "E01", title: "Deploy final", description: "Tudo em produção: banco, frontend, agente", status: "pendente", dueDate: "2026-07-05", phase: "delivery" },
          { id: "E02", title: "Cadastrar equipe", description: "16 funcionários com login e permissões", status: "pendente", dueDate: "2026-07-06", phase: "delivery" },
          { id: "E03", title: "Cadastrar clientes", description: "~90 clientes importados no sistema", status: "pendente", dueDate: "2026-07-06", phase: "delivery" },
          { id: "E04", title: "Treinamento gestoras", description: "Sessão de 1-2h com Cristiane e Alessandra", status: "pendente", dueDate: "2026-07-08", phase: "delivery" },
          { id: "E05", title: "Treinamento equipe", description: "Sessão de 45min com funcionários", status: "pendente", dueDate: "2026-07-09", phase: "delivery" },
          { id: "E06", title: "Go-live e monitoramento", description: "Primeira semana em produção real", status: "pendente", dueDate: "2026-07-11", phase: "delivery" },
        ],
      },
    ],
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
