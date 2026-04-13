import { createFileRoute } from '@tanstack/react-router';
import { ImperiusLanding } from '@/components/imperius-landing';

export const Route = createFileRoute('/')({
  component: ImperiusLanding,
});
