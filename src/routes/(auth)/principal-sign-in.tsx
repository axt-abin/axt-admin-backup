import { createFileRoute } from '@tanstack/react-router'
import SignIn from '@/features/auth/sign-in'

export const Route = createFileRoute('/(auth)/principal-sign-in')({
  component: () => <SignIn defaultUserType="principal" />,
}) 