import { Link, useRouterState } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Shield } from 'lucide-react'

export default function NotFoundError() {
  const { location } = useRouterState()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Shield className="h-10 w-10 text-primary" />
        </div>
        
        <h1 className="mb-2 text-4xl font-bold">404</h1>
        <h2 className="mb-3 text-2xl font-semibold">Page Not Found</h2>
        
        <p className="mb-6 text-muted-foreground">
          We couldn't find the page you're looking for. The page might have been moved, deleted, 
          or the URL might be incorrect.
        </p>
        
        <div className="mb-8 rounded-md bg-muted p-4 text-sm">
          <p className="font-mono text-muted-foreground">
            {location.pathname}
          </p>
        </div>
        
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild>
            <Link to="/">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/help-center">Visit Help Center</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
