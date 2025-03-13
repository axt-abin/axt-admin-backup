import { Link, useRouterState } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function GeneralError() {
  const { location } = useRouterState()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
        
        <h1 className="mb-2 text-4xl font-bold">500</h1>
        <h2 className="mb-3 text-2xl font-semibold">Server Error</h2>
        
        <p className="mb-6 text-muted-foreground">
          We're sorry, but something went wrong on our end. Our team has been notified and is working to fix the issue.
        </p>
        
        <div className="mb-8 rounded-md bg-muted p-4 text-sm">
          <p className="font-mono text-muted-foreground">
            Error at: {location.pathname}
          </p>
        </div>
        
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild>
            <Link to="/">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  )
}
