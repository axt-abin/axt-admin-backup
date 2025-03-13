import { createLazyFileRoute } from '@tanstack/react-router'
import ConsentPageComponent from '@/features/auth/consent'

export const Route = createLazyFileRoute('/(auth)/consent')({
  component: ConsentPage,
})

function ConsentPage() {
  return <ConsentPageComponent />
} 