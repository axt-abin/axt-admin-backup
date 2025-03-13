import { createLazyFileRoute } from '@tanstack/react-router'
import KycPageComponent from '@/features/auth/kyc'

export const Route = createLazyFileRoute('/(auth)/kyc')({
  component: KycPage,
})

function KycPage() {
  return <KycPageComponent />
} 