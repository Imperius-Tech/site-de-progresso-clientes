import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";

const queryClient = new QueryClient();

function NotFoundComponent() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-landing-bg px-4"
      style={{
        backgroundImage: `radial-gradient(circle, var(--landing-grid) 1.2px, transparent 1.2px)`,
        backgroundSize: '24px 24px',
      }}
    >
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-landing-dark">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-landing-dark">Page not found</h2>
        <p className="mt-2 text-sm text-landing-light-muted">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-landing-dark px-6 py-2 text-sm font-medium text-landing-light transition-colors hover:bg-landing-dark-subtle">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Imperius Tech — Acompanhamento de Projetos" },
      { name: "description", content: "Acompanhe em tempo real o progresso dos projetos desenvolvidos pela Imperius Tech." },
      { property: "og:title", content: "Imperius Tech — Acompanhamento de Projetos" },
      { name: "twitter:title", content: "Imperius Tech — Acompanhamento de Projetos" },
      { property: "og:description", content: "Acompanhe em tempo real o progresso dos projetos desenvolvidos pela Imperius Tech." },
      { name: "twitter:description", content: "Acompanhe em tempo real o progresso dos projetos desenvolvidos pela Imperius Tech." },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/8JNABpLnp7Mx4rKPqtRXqYncb2k2/social-images/social-1776123291253-logo-imperius-rebranding.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/8JNABpLnp7Mx4rKPqtRXqYncb2k2/social-images/social-1776123291253-logo-imperius-rebranding.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&family=DM+Serif+Display&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}
