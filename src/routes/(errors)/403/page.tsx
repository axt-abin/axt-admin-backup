import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ShieldOff } from 'lucide-react'

export const Route = createFileRoute('/(errors)/403/page')({
  component: ForbiddenPage,
})

function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
          <ShieldOff className="h-10 w-10 text-amber-600" />
        </div>
        
        <h1 className="mb-2 text-4xl font-bold">403</h1>
        <h2 className="mb-3 text-2xl font-semibold">Access Denied</h2>
        
        <p className="mb-6 text-muted-foreground">
          You don't have permission to access this page. If you believe this is an error, 
          please contact your administrator or support team.
        </p>
        
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild>
            <Link to="/">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/help-center">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 