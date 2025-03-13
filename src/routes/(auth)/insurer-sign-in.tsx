import { createFileRoute } from '@tanstack/react-router'
import SignIn from '@/features/auth/sign-in'

export const Route = createFileRoute('/(auth)/insurer-sign-in')({
  component: () => <SignIn defaultUserType="insurer" />,
}) 