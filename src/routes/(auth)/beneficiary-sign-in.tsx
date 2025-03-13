import { createFileRoute } from '@tanstack/react-router'
import SignIn from '@/features/auth/sign-in'

export const Route = createFileRoute('/(auth)/beneficiary-sign-in')({
  component: () => <SignIn defaultUserType="beneficiary" />,
}) 