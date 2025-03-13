import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { IconFileUpload, IconClipboardList, IconRefresh, IconAlertCircle } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { BarChart3, FileText, ShieldCheck, Users } from 'lucide-react'

// Define topNav at the top of the file
const topNav = [
  {
    title: 'Dashboard',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'My Bonds',
    href: 'dashboard/bonds',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Applications',
    href: 'dashboard/applications',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Documents',
    href: 'dashboard/documents',
    isActive: false,
    disabled: false,
  },
]

export default function PrincipalDashboard() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Principal Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Bonds
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Total value: ₹45,00,000
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Applications
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Last updated: 2 days ago
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
              Due in 30 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Claims
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              No active claims
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Bond Activity</CardTitle>
            <CardDescription>
              Your recent bond applications and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Performance Bond - GeM Project #12345</p>
                  <p className="text-sm text-muted-foreground">Applied on: 15 Mar 2023</p>
                </div>
                <Badge>Under Review</Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Bid Security Bond - NHAI Tender</p>
                  <p className="text-sm text-muted-foreground">Applied on: 10 Mar 2023</p>
                </div>
                <Badge variant="outline">Documentation Pending</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Advance Payment Bond - Railway Project</p>
                  <p className="text-sm text-muted-foreground">Issued on: 28 Feb 2023</p>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full justify-between" variant="outline">
                Apply for New Bond
              </Button>
              
              <Button className="w-full justify-between" variant="outline">
                Upload Documents
              </Button>
              
              <Button className="w-full justify-between" variant="outline">
                View My Bonds
              </Button>
              
              <Button className="w-full justify-between" variant="outline">
                Check Renewal Status
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 