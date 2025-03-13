import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  Activity, 
  AlertTriangle, 
  ArrowUpRight, 
  BarChart3, 
  Bell, 
  Briefcase, 
  ChevronRight, 
  ClipboardCheck, 
  CreditCard, 
  FileText, 
  HandCoins, 
  PieChart as PieChartIcon, 
  Shield, 
  TrendingUp, 
  Users, 
  LayoutDashboard, 
  LineChart, 
  ShieldAlert 
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import { useAuthStore } from '@/stores/authStore'
import { RiskAnalysis } from './risk-analysis'
import { Underwriting } from './underwriting'
import { useLocation } from '@tanstack/react-router'
// Import Recharts components directly instead of Tremor
import { 
  AreaChart, 
  Area,
  BarChart, 
  Bar,
  PieChart as ReChartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
// Import Shadcn chart components
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

// Mock data for charts and metrics
const riskMetrics = {
  totalExposure: '₹12.5 Cr',
  highRiskBonds: 8,
  mediumRiskBonds: 24,
  lowRiskBonds: 110,
  riskScore: 'Medium',
  riskPercentage: 42
}

const claimsMetrics = {
  totalClaims: 32,
  pendingClaims: 12,
  approvedClaims: 15,
  rejectedClaims: 5,
  fraudAlerts: 3
}

const underwritingMetrics = {
  pendingApplications: 24,
  approvedBonds: 142,
  rejectedApplications: 18,
  renewalsDue: 7,
  averageApprovalTime: '2.3 days'
}

const collectionMetrics = {
  totalOutstanding: '₹3.2 Cr',
  overdueAmount: '₹1.8 Cr',
  legalEscalations: 5,
  recoveredAmount: '₹0.8 Cr',
  recoveryRate: '25%'
}

const brokerMetrics = {
  totalBrokers: 18,
  activeBrokers: 12,
  pendingApprovals: 8,
  topPerformer: 'ABC Brokers',
  conversionRate: '68%'
}

// Chart data
const riskDistributionData = [
  {
    name: 'High Risk',
    value: 8,
  },
  {
    name: 'Medium Risk',
    value: 24,
  },
  {
    name: 'Low Risk',
    value: 110,
  },
]

const claimsChartData = [
  {
    name: 'Pending',
    value: 12,
  },
  {
    name: 'Approved',
    value: 15,
  },
  {
    name: 'Rejected',
    value: 5,
  },
]

const monthlyPremiumsData = [
  {
    month: 'Jan',
    "Collected": 4500000,
    "Outstanding": 1200000,
  },
  {
    month: 'Feb',
    "Collected": 5200000,
    "Outstanding": 980000,
  },
  {
    month: 'Mar',
    "Collected": 4800000,
    "Outstanding": 1100000,
  },
  {
    month: 'Apr',
    "Collected": 5500000,
    "Outstanding": 850000,
  },
  {
    month: 'May',
    "Collected": 6100000,
    "Outstanding": 920000,
  },
  {
    month: 'Jun',
    "Collected": 5800000,
    "Outstanding": 1050000,
  },
]

const bondApplicationsData = [
  {
    month: 'Jan',
    "Approved": 18,
    "Rejected": 4,
    "Pending": 6,
  },
  {
    month: 'Feb',
    "Approved": 22,
    "Rejected": 3,
    "Pending": 8,
  },
  {
    month: 'Mar',
    "Approved": 20,
    "Rejected": 5,
    "Pending": 4,
  },
  {
    month: 'Apr',
    "Approved": 25,
    "Rejected": 2,
    "Pending": 7,
  },
  {
    month: 'May',
    "Approved": 28,
    "Rejected": 4,
    "Pending": 5,
  },
  {
    month: 'Jun',
    "Approved": 29,
    "Rejected": 2,
    "Pending": 9,
  },
]

const recentApplications = [
  {
    id: 'APP-7890',
    company: 'TechSolutions Ltd',
    amount: '₹25,00,000',
    status: 'pending',
    date: '2023-06-15',
    riskScore: 'Medium',
  },
  {
    id: 'APP-7891',
    company: 'Global Traders Inc',
    amount: '₹18,50,000',
    status: 'review',
    date: '2023-06-14',
    riskScore: 'Low',
  },
  {
    id: 'APP-7892',
    company: 'Sunrise Exports',
    amount: '₹32,75,000',
    status: 'approved',
    date: '2023-06-12',
    riskScore: 'Low',
  },
  {
    id: 'APP-7893',
    company: 'Metro Constructions',
    amount: '₹45,00,000',
    status: 'pending',
    date: '2023-06-10',
    riskScore: 'High',
  },
]

const recentClaims = [
  {
    id: 'CLM-4567',
    company: 'City Infrastructure Ltd',
    amount: '₹15,00,000',
    status: 'pending',
    date: '2023-06-18',
    riskScore: 'High',
  },
  {
    id: 'CLM-4568',
    company: 'Horizon Developers',
    amount: '₹8,25,000',
    status: 'review',
    date: '2023-06-16',
    riskScore: 'Medium',
  },
  {
    id: 'CLM-4569',
    company: 'Prime Contractors',
    amount: '₹12,50,000',
    status: 'approved',
    date: '2023-06-14',
    riskScore: 'Low',
  },
]

export function InsurerDashboard() {
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('dashboard')
  const { user } = useAuthStore((state) => state.auth)

  // Determine active section based on URL path
  useEffect(() => {
    const path = location.pathname
    if (path.includes('/insurer/underwriting')) {
      setActiveSection('underwriting')
    } else if (path.includes('/insurer/approvals')) {
      setActiveSection('bond-approval')
    } else if (path.includes('/insurer/claims')) {
      setActiveSection('claims')
    } else if (path.includes('/insurer/analytics')) {
      setActiveSection('risk-analysis')
    } else if (path.includes('/insurer/premiums')) {
      setActiveSection('collection')
    } else if (path.includes('/settings')) {
      setActiveSection('account-settings')
    } else if (path.includes('/profile')) {
      setActiveSection('profile')
    } else {
      setActiveSection('dashboard')
    }
  }, [location.pathname])

  const getRiskBadgeColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'bg-red-200 text-red-800 hover:bg-red-300'
      case 'medium':
        return 'bg-amber-200 text-amber-800 hover:bg-amber-300'
      case 'low':
        return 'bg-green-200 text-green-800 hover:bg-green-300'
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    }
  }

  // Chart configurations for Shadcn charts
  const riskChartConfig = {
    'High Risk': {
      label: 'High Risk',
      color: '#E57373', // Darker red for high risk
    },
    'Medium Risk': {
      label: 'Medium Risk',
      color: '#FFD54F', // Darker yellow for medium risk
    },
    'Low Risk': {
      label: 'Low Risk',
      color: '#81C784', // Darker green for low risk
    },
  } satisfies ChartConfig

  const claimsChartConfig = {
    'Pending': {
      label: 'Pending',
      color: '#FFD54F', // Darker yellow for pending
    },
    'Approved': {
      label: 'Approved',
      color: '#81C784', // Darker green for approved
    },
    'Rejected': {
      label: 'Rejected',
      color: '#E57373', // Darker red for rejected
    },
  } satisfies ChartConfig

  const premiumsChartConfig = {
    'Collected': {
      label: 'Collected',
      color: '#81C784', // Darker green for collected
    },
    'Outstanding': {
      label: 'Outstanding',
      color: '#FFD54F', // Darker yellow for outstanding
    },
  } satisfies ChartConfig

  const applicationsChartConfig = {
    'Approved': {
      label: 'Approved',
      color: '#81C784', // Darker green for approved
    },
    'Rejected': {
      label: 'Rejected',
      color: '#E57373', // Darker red for rejected
    },
    'Pending': {
      label: 'Pending',
      color: '#FFD54F', // Darker yellow for pending
    },
  } satisfies ChartConfig

  // Format large numbers for charts
  const valueFormatter = (number: number) => 
    `₹${Intl.NumberFormat('en-IN').format(number / 100000)} L`

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:h-16 lg:h-[60px] lg:px-6">
        <div className="flex-1">
          <h1 className="text-xl font-semibold">
            {activeSection === 'dashboard' && 'Insurer Dashboard'}
            {activeSection === 'risk-analysis' && 'Risk Analysis'}
            {activeSection === 'underwriting' && 'Underwriting'}
            {activeSection === 'claims' && 'Claims Processing'}
            {activeSection === 'collection' && 'Premium Management'}
            {activeSection === 'bond-approval' && 'Bond Approval'}
            {activeSection === 'profile' && 'My Profile'}
            {activeSection === 'account-settings' && 'Account Settings'}
            {activeSection === 'help' && 'Help Center'}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        {activeSection === 'dashboard' && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risk Exposure</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{riskMetrics.totalExposure}</div>
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <div className="flex-1">Risk Score: {riskMetrics.riskScore}</div>
                  <div>{riskMetrics.riskPercentage}%</div>
                </div>
                <Progress value={riskMetrics.riskPercentage} className="mt-1" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Claims</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{claimsMetrics.totalClaims}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Pending: {claimsMetrics.pendingClaims}</span>
                    <span>Approved: {claimsMetrics.approvedClaims}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3 text-amber-500" />
                    <span>{claimsMetrics.fraudAlerts} fraud alerts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Underwriting</CardTitle>
                <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{underwritingMetrics.pendingApplications}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  <div>Pending applications</div>
                  <div className="mt-1 flex items-center gap-1">
                    <span>Avg. approval time: {underwritingMetrics.averageApprovalTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Collection</CardTitle>
                <HandCoins className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{collectionMetrics.totalOutstanding}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  <div>Total outstanding amount</div>
                  <div className="mt-1 flex items-center gap-1">
                    <span>Overdue: {collectionMetrics.overdueAmount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Charts Section */}
        {activeSection === 'dashboard' && (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
                <CardDescription>
                  Distribution of bonds by risk category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={riskChartConfig} className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReChartsPieChart>
                      <Pie
                        data={riskDistributionData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                      >
                        {riskDistributionData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={riskChartConfig[entry.name as keyof typeof riskChartConfig].color} 
                          />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                      <Legend />
                    </ReChartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Claims Status</CardTitle>
                <CardDescription>
                  Current status of all claims
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={claimsChartConfig} className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReChartsPieChart>
                      <Pie
                        data={claimsChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                      >
                        {claimsChartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={claimsChartConfig[entry.name as keyof typeof claimsChartConfig].color} 
                          />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                      <Legend />
                    </ReChartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Premium Collection</CardTitle>
                <CardDescription>
                  Collected vs outstanding premiums
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={premiumsChartConfig} className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={monthlyPremiumsData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={valueFormatter} />
                      <ChartTooltip 
                        content={<ChartTooltipContent indicator="line" />}
                        formatter={valueFormatter}
                      />
                      <Area
                        type="monotone"
                        dataKey="Collected"
                        stroke={premiumsChartConfig["Collected"].color}
                        fill={premiumsChartConfig["Collected"].color}
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="Outstanding"
                        stroke={premiumsChartConfig["Outstanding"].color}
                        fill={premiumsChartConfig["Outstanding"].color}
                        fillOpacity={0.3}
                      />
                      <Legend />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bond Applications</CardTitle>
                <CardDescription>
                  Monthly application status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={applicationsChartConfig} className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={bondApplicationsData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                      <Bar dataKey="Approved" fill={applicationsChartConfig["Approved"].color} />
                      <Bar dataKey="Rejected" fill={applicationsChartConfig["Rejected"].color} />
                      <Bar dataKey="Pending" fill={applicationsChartConfig["Pending"].color} />
                      <Legend />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Applications and Claims */}
        {activeSection === 'dashboard' && (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>
                  You have {recentApplications.filter(app => app.status === 'pending').length} applications pending review
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div key={application.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-sm font-medium">{application.company}</p>
                          <p className="text-xs text-muted-foreground">{application.id} • {application.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm">{application.amount}</div>
                        <Badge variant="outline" className={cn(
                          "text-xs",
                          getRiskBadgeColor(application.riskScore)
                        )}>
                          {application.riskScore}
                        </Badge>
                        <Badge variant={
                          application.status === 'approved' ? 'secondary' :
                          application.status === 'pending' ? 'outline' : 'default'
                        }>
                          {application.status === 'approved' ? 'Approved' :
                           application.status === 'pending' ? 'Pending' : 'Under Review'}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Applications</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Claims</CardTitle>
                <CardDescription>
                  You have {recentClaims.filter(claim => claim.status === 'pending').length} claims pending review
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentClaims.map((claim) => (
                    <div key={claim.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-sm font-medium">{claim.company}</p>
                          <p className="text-xs text-muted-foreground">{claim.id} • {claim.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm">{claim.amount}</div>
                        <Badge variant="outline" className={cn(
                          "text-xs",
                          getRiskBadgeColor(claim.riskScore)
                        )}>
                          {claim.riskScore}
                        </Badge>
                        <Badge variant={
                          claim.status === 'approved' ? 'secondary' :
                          claim.status === 'pending' ? 'outline' : 'default'
                        }>
                          {claim.status === 'approved' ? 'Approved' :
                           claim.status === 'pending' ? 'Pending' : 'Under Review'}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Claims</Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Risk Analysis Section */}
        {activeSection === 'risk-analysis' && (
          <div className="space-y-6">
            <RiskAnalysis />
          </div>
        )}

        {/* Underwriting Section */}
        {activeSection === 'underwriting' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Underwriting</h2>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                New Application
              </Button>
            </div>
            <Underwriting />
          </div>
        )}

        {/* Placeholder for other sections */}
        {(activeSection === 'claims' || 
          activeSection === 'collection' || 
          activeSection === 'bond-approval' || 
          activeSection === 'profile' || 
          activeSection === 'account-settings' || 
          activeSection === 'help') && (
          <Card>
            <CardHeader>
              <CardTitle>{
                activeSection === 'claims' ? 'Claims Processing' :
                activeSection === 'collection' ? 'Premium Management' :
                activeSection === 'bond-approval' ? 'Bond Approval' :
                activeSection === 'profile' ? 'My Profile' :
                activeSection === 'account-settings' ? 'Account Settings' :
                'Help Center'
              }</CardTitle>
              <CardDescription>
                This section is under development. Check back soon for updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  {activeSection === 'claims' && <FileText className="h-16 w-16 text-muted-foreground" />}
                  {activeSection === 'collection' && <HandCoins className="h-16 w-16 text-muted-foreground" />}
                  {activeSection === 'bond-approval' && <Shield className="h-16 w-16 text-muted-foreground" />}
                  {activeSection === 'profile' && <Users className="h-16 w-16 text-muted-foreground" />}
                  {activeSection === 'account-settings' && <BarChart3 className="h-16 w-16 text-muted-foreground" />}
                  {activeSection === 'help' && <HandCoins className="h-16 w-16 text-muted-foreground" />}
                </div>
                <p className="text-muted-foreground">
                  We're working on this feature. It will be available soon.
                </p>
                <Button className="mt-4" onClick={() => setActiveSection('dashboard')}>Back to Dashboard</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
} 