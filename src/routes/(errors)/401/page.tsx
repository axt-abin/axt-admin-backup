import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'

export const Route = createFileRoute('/(errors)/401/page')({
  component: UnauthorizedPage,
})

function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Lock className="h-10 w-10 text-primary" />
        </div>
        
        <h1 className="mb-2 text-4xl font-bold">401</h1>
        <h2 className="mb-3 text-2xl font-semibold">Authentication Required</h2>
        
        <p className="mb-6 text-muted-foreground">
          You need to be logged in to access this page. Please sign in with your credentials to continue.
        </p>
        
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/sign-up">Create Account</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 