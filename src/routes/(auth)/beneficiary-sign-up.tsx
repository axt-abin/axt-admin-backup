import { createFileRoute } from '@tanstack/react-router'
import SignUp from '@/features/auth/sign-up'

export const Route = createFileRoute('/(auth)/beneficiary-sign-up')({
  component: () => <SignUp defaultUserType="beneficiary" />,
}) 