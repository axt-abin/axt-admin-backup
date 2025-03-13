import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import PrincipalDashboard from '@/features/dashboard/principal/index'
import BeneficiaryDashboard from '@/features/dashboard/beneficiary/index'
import { InsurerDashboard } from '@/features/dashboard/insurer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, BarChart3, FileText, ShieldCheck, Users } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/')({
  component: DashboardPage,
})

function DashboardPage() {
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

  // Default dashboard for other user types (beneficiary, insurer)
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bonds
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Applications
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              +1 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Open Claims
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              No change from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Renewals
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Due in 45 days
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your recent bond and claim activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-4 bg-blue-100 p-2 rounded-full">
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Performance Bond Issued</p>
                  <p className="text-xs text-muted-foreground">Bond #B001 for $50,000 was issued</p>
                </div>
                <div className="text-xs text-muted-foreground">2 days ago</div>
              </div>
              
              <div className="flex items-center">
                <div className="mr-4 bg-amber-100 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New Application Submitted</p>
                  <p className="text-xs text-muted-foreground">Bid Bond application for Project XYZ</p>
                </div>
                <div className="text-xs text-muted-foreground">5 days ago</div>
              </div>
              
              <div className="flex items-center">
                <div className="mr-4 bg-red-100 p-2 rounded-full">
                  <BarChart3 className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Claim Filed</p>
                  <p className="text-xs text-muted-foreground">Claim #C001 filed against Bond #B001</p>
                </div>
                <div className="text-xs text-muted-foreground">1 week ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full justify-between" variant="outline">
                New Bond Application
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button className="w-full justify-between" variant="outline">
                Upload Documents
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button className="w-full justify-between" variant="outline">
                View Bonds
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button className="w-full justify-between" variant="outline">
                Track Claims
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
