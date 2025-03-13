import { createLazyFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

export const Route = createLazyFileRoute('/_authenticated/principal/applications/')({
  component: PrincipalApplicationsPage,
})

function PrincipalApplicationsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bond Applications</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> New Application
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>My Applications</CardTitle>
          <CardDescription>
            View and manage your bond applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 text-muted-foreground">
            No applications found. Click "New Application" to get started.
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 