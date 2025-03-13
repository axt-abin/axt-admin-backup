import { createFileRoute } from '@tanstack/react-router'
import { InsurerDashboard } from '@/features/dashboard/insurer'

export const Route = createFileRoute('/_authenticated/insurer/analytics')({
  component: () => <InsurerDashboard />,
}) 