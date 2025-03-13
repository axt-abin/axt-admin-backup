import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import { InsurerDashboard } from '@/features/dashboard/insurer'
import PrincipalDashboard from '@/features/dashboard/principal'
import BeneficiaryDashboard from '@/features/dashboard/beneficiary'

export const Route = createFileRoute('/_authenticated/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  const { user } = useAuthStore((state) => state.auth)

  // Render the appropriate dashboard based on user type
  if (user?.userType === 'principal') {
    return <PrincipalDashboard />
  }

  if (user?.userType === 'beneficiary') {
    return <BeneficiaryDashboard />
  }

  if (user?.userType === 'insurer') {
    return <InsurerDashboard />
  }

  // Default fallback
  return <div>Settings Page</div>
} 