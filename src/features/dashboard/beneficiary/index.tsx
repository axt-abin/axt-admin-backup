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
import { IconFileUpload, IconClipboardList, IconRefresh, IconAlertCircle, IconSearch } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'

export default function BeneficiaryDashboard() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Beneficiary Dashboard</h1>
          <div className='flex items-center space-x-2'>
            <Button>Search Bonds</Button>
          </div>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='bonds'>Bonds</TabsTrigger>
              <TabsTrigger value='claims'>Claims</TabsTrigger>
              <TabsTrigger value='messages'>Messages</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Active Bonds
                  </CardTitle>
                  <IconClipboardList className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>5</div>
                  <p className='text-xs text-muted-foreground'>
                    Total value: ₹75,00,000
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Expiring Soon
                  </CardTitle>
                  <IconRefresh className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>2</div>
                  <p className='text-xs text-muted-foreground'>
                    Within next 30 days
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Active Claims
                  </CardTitle>
                  <IconAlertCircle className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>1</div>
                  <p className='text-xs text-muted-foreground'>
                    In processing
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    New Bonds
                  </CardTitle>
                  <IconSearch className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>10+</div>
                  <p className='text-xs text-muted-foreground'>
                    Available to view
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Recent Bond Activity</CardTitle>
                  <CardDescription>
                    Recent bonds and claims activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">Performance Bond - Project Alpha</p>
                        <p className="text-sm text-muted-foreground">Principal: Acme Construction Ltd.</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">Bid Security Bond - Tender #45678</p>
                        <p className="text-sm text-muted-foreground">Principal: BuildRight Solutions</p>
                      </div>
                      <Badge variant="outline">Expiring Soon</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Claim Filed - Project Delta</p>
                        <p className="text-sm text-muted-foreground">Filed on: 10 Mar 2023</p>
                      </div>
                      <Badge variant="secondary">In Review</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>
                    Recent communications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">Claim Update</p>
                        <p className="text-sm text-muted-foreground">From: AxiTrust Claims Dept.</p>
                      </div>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">Bond Expiry Notice</p>
                        <p className="text-sm text-muted-foreground">From: AxiTrust Notifications</p>
                      </div>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Principal Response</p>
                        <p className="text-sm text-muted-foreground">From: Acme Construction Ltd.</p>
                      </div>
                      <p className="text-xs text-muted-foreground">2 weeks ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value='bonds' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Bond Listings</CardTitle>
                <CardDescription>
                  View and manage bonds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Bond listings content will go here</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='claims' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Claims Management</CardTitle>
                <CardDescription>
                  Submit and track claims
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Claims management content will go here</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='messages' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Communication</CardTitle>
                <CardDescription>
                  Messages and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Communication content will go here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

const topNav = [
  {
    title: 'Dashboard',
    href: '/',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Bonds',
    href: '/beneficiary/bonds',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Claims',
    href: '/beneficiary/claims',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Messages',
    href: '/beneficiary/messages',
    isActive: false,
    disabled: false,
  },
] 