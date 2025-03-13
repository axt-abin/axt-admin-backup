import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  AlertTriangle, 
  ArrowDown, 
  ArrowRight,
  ArrowUp, 
  BarChart3, 
  ChevronRight, 
  FileText, 
  Info, 
  PieChart, 
  Shield, 
  TrendingDown, 
  TrendingUp 
} from 'lucide-react'
import { cn } from '@/lib/utils'
// Import Recharts components directly instead of Tremor
import { 
  AreaChart, 
  Area,
  BarChart, 
  Bar,
  LineChart,
  Line,
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

// Mock data for risk analysis
const principalRiskHistory = [
  {
    id: 'PRI-1001',
    name: 'TechSolutions Ltd',
    totalBonds: 5,
    activeBonds: 3,
    totalValue: '₹1.2 Cr',
    riskScore: 'Medium',
    riskTrend: 'stable',
    fraudFlags: 0,
    lastActivity: '2023-06-10',
  },
  {
    id: 'PRI-1002',
    name: 'Metro Constructions',
    totalBonds: 8,
    activeBonds: 6,
    totalValue: '₹3.5 Cr',
    riskScore: 'High',
    riskTrend: 'increasing',
    fraudFlags: 2,
    lastActivity: '2023-06-15',
  },
  {
    id: 'PRI-1003',
    name: 'Global Traders Inc',
    totalBonds: 3,
    activeBonds: 2,
    totalValue: '₹0.8 Cr',
    riskScore: 'Low',
    riskTrend: 'decreasing',
    fraudFlags: 0,
    lastActivity: '2023-06-12',
  },
  {
    id: 'PRI-1004',
    name: 'Sunrise Exports',
    totalBonds: 4,
    activeBonds: 4,
    totalValue: '₹1.5 Cr',
    riskScore: 'Low',
    riskTrend: 'stable',
    fraudFlags: 0,
    lastActivity: '2023-06-08',
  },
  {
    id: 'PRI-1005',
    name: 'City Infrastructure Ltd',
    totalBonds: 6,
    activeBonds: 5,
    totalValue: '₹2.8 Cr',
    riskScore: 'High',
    riskTrend: 'increasing',
    fraudFlags: 1,
    lastActivity: '2023-06-14',
  },
]

const creditLineData = [
  {
    principal: 'TechSolutions Ltd',
    creditLimit: '₹2.0 Cr',
    currentExposure: '₹1.2 Cr',
    utilizationPercentage: 60,
    availableCredit: '₹0.8 Cr',
    riskCategory: 'Medium',
  },
  {
    principal: 'Metro Constructions',
    creditLimit: '₹4.0 Cr',
    currentExposure: '₹3.5 Cr',
    utilizationPercentage: 88,
    availableCredit: '₹0.5 Cr',
    riskCategory: 'High',
  },
  {
    principal: 'Global Traders Inc',
    creditLimit: '₹1.5 Cr',
    currentExposure: '₹0.8 Cr',
    utilizationPercentage: 53,
    availableCredit: '₹0.7 Cr',
    riskCategory: 'Low',
  },
  {
    principal: 'Sunrise Exports',
    creditLimit: '₹2.5 Cr',
    currentExposure: '₹1.5 Cr',
    utilizationPercentage: 60,
    availableCredit: '₹1.0 Cr',
    riskCategory: 'Low',
  },
  {
    principal: 'City Infrastructure Ltd',
    creditLimit: '₹3.0 Cr',
    currentExposure: '₹2.8 Cr',
    utilizationPercentage: 93,
    availableCredit: '₹0.2 Cr',
    riskCategory: 'High',
  },
]

const riskClassificationCriteria = [
  {
    category: 'Low Risk',
    criteria: [
      'Credit utilization < 60%',
      'No fraud flags',
      'Stable or decreasing risk trend',
      'Timely premium payments',
      'Strong financial metrics',
    ],
    action: 'Automated approval for bonds up to ₹50 lakhs',
    color: 'bg-green-100 text-green-800',
  },
  {
    category: 'Medium Risk',
    criteria: [
      'Credit utilization 60-80%',
      'No more than 1 fraud flag',
      'Stable risk trend',
      'Occasional late premium payments',
      'Average financial metrics',
    ],
    action: 'Manual review required for bonds > ₹25 lakhs',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    category: 'High Risk',
    criteria: [
      'Credit utilization > 80%',
      'Multiple fraud flags',
      'Increasing risk trend',
      'Frequent late premium payments',
      'Poor financial metrics',
    ],
    action: 'Senior underwriter approval required for all bonds',
    color: 'bg-red-100 text-red-800',
  },
]

// Chart data for portfolio exposure
const portfolioExposureData = [
  {
    sector: 'Construction',
    value: 450,
  },
  {
    sector: 'IT & Technology',
    value: 320,
  },
  {
    sector: 'Manufacturing',
    value: 280,
  },
  {
    sector: 'Healthcare',
    value: 180,
  },
  {
    sector: 'Retail',
    value: 150,
  },
  {
    sector: 'Others',
    value: 120,
  },
]

// Chart data for credit utilization trends
const creditUtilizationData = [
  {
    month: 'Jan',
    'Metro Constructions': 75,
    'TechSolutions Ltd': 55,
    'City Infrastructure Ltd': 80,
  },
  {
    month: 'Feb',
    'Metro Constructions': 78,
    'TechSolutions Ltd': 58,
    'City Infrastructure Ltd': 82,
  },
  {
    month: 'Mar',
    'Metro Constructions': 82,
    'TechSolutions Ltd': 60,
    'City Infrastructure Ltd': 85,
  },
  {
    month: 'Apr',
    'Metro Constructions': 85,
    'TechSolutions Ltd': 62,
    'City Infrastructure Ltd': 88,
  },
  {
    month: 'May',
    'Metro Constructions': 88,
    'TechSolutions Ltd': 60,
    'City Infrastructure Ltd': 90,
  },
  {
    month: 'Jun',
    'Metro Constructions': 88,
    'TechSolutions Ltd': 60,
    'City Infrastructure Ltd': 93,
  },
]

// Chart data for risk classification distribution
const riskDistributionData = [
  {
    name: 'Low Risk',
    value: 42,
  },
  {
    name: 'Medium Risk',
    value: 21,
  },
  {
    name: 'High Risk',
    value: 7,
  },
]

// Financial trends data
const financialTrendsData = [
  {
    month: 'Jan',
    'Revenue Growth': 5,
    'Profit Margin': 12,
    'Debt-to-Equity': 45,
  },
  {
    month: 'Feb',
    'Revenue Growth': 2,
    'Profit Margin': 10,
    'Debt-to-Equity': 48,
  },
  {
    month: 'Mar',
    'Revenue Growth': -1,
    'Profit Margin': 8,
    'Debt-to-Equity': 52,
  },
  {
    month: 'Apr',
    'Revenue Growth': -5,
    'Profit Margin': 6,
    'Debt-to-Equity': 58,
  },
  {
    month: 'May',
    'Revenue Growth': -10,
    'Profit Margin': 4,
    'Debt-to-Equity': 62,
  },
  {
    month: 'Jun',
    'Revenue Growth': -15,
    'Profit Margin': 2,
    'Debt-to-Equity': 68,
  },
]

// Chart configurations
const riskChartConfig: ChartConfig = {
  'Low Risk': {
    label: 'Low Risk',
    color: '#81C784',
  },
  'Medium Risk': {
    label: 'Medium Risk',
    color: '#FFD54F',
  },
  'High Risk': {
    label: 'High Risk',
    color: '#E57373',
  },
}

const sectorChartConfig: ChartConfig = {
  'Construction': {
    label: 'Construction',
    color: '#81C784',
  },
  'IT & Technology': {
    label: 'IT & Technology',
    color: '#FFD54F',
  },
  'Manufacturing': {
    label: 'Manufacturing',
    color: '#E57373',
  },
  'Healthcare': {
    label: 'Healthcare',
    color: '#4DB6AC',
  },
  'Retail': {
    label: 'Retail',
    color: '#7986CB',
  },
  'Others': {
    label: 'Others',
    color: '#9575CD',
  },
}

const creditUtilizationConfig: ChartConfig = {
  'Metro Constructions': {
    label: 'Metro Constructions',
    color: '#E57373',
  },
  'TechSolutions Ltd': {
    label: 'TechSolutions Ltd',
    color: '#FFD54F',
  },
  'City Infrastructure Ltd': {
    label: 'City Infrastructure Ltd',
    color: '#81C784',
  },
}

const financialTrendsConfig: ChartConfig = {
  'Revenue Growth': {
    label: 'Revenue Growth',
    color: '#81C784',
  },
  'Profit Margin': {
    label: 'Profit Margin',
    color: '#FFD54F',
  },
  'Debt-to-Equity': {
    label: 'Debt-to-Equity',
    color: '#E57373',
  },
}

export function RiskAnalysis() {
  // Format large numbers for charts
  const valueFormatter = (number: number) => 
    `₹${Intl.NumberFormat('en-IN').format(number / 10)} L`
    
  // Chart configurations for Shadcn charts with sapphire theme
  const riskChartConfig = {
    'Low Risk': {
      label: 'Low Risk',
      color: '#81C784', // Darker green for low risk
    },
    'Medium Risk': {
      label: 'Medium Risk',
      color: '#FFD54F', // Darker yellow for medium risk
    },
    'High Risk': {
      label: 'High Risk',
      color: '#E57373', // Darker red for high risk
    },
  } satisfies ChartConfig

  const sectorChartConfig = {
    'Construction': {
      label: 'Construction',
      color: '#81C784', // Darker green
    },
    'IT & Technology': {
      label: 'IT & Technology',
      color: '#FFD54F', // Darker yellow
    },
    'Manufacturing': {
      label: 'Manufacturing',
      color: '#E57373', // Darker red
    },
    'Healthcare': {
      label: 'Healthcare',
      color: '#4DB6AC', // Teal
    },
    'Retail': {
      label: 'Retail',
      color: '#7986CB', // Indigo
    },
    'Others': {
      label: 'Others',
      color: '#9575CD', // Purple
    },
  } satisfies ChartConfig

  const creditUtilizationConfig = {
    'Metro Constructions': {
      label: 'Metro Constructions',
      color: '#E57373', // Darker red for high risk company
    },
    'TechSolutions Ltd': {
      label: 'TechSolutions Ltd',
      color: '#FFD54F', // Darker yellow for medium risk company
    },
    'City Infrastructure Ltd': {
      label: 'City Infrastructure Ltd',
      color: '#81C784', // Darker green for low risk company
    },
  } satisfies ChartConfig

  const financialTrendsConfig = {
    'Revenue Growth': {
      label: 'Revenue Growth',
      color: '#81C784', // Darker green
    },
    'Profit Margin': {
      label: 'Profit Margin',
      color: '#FFD54F', // Darker yellow
    },
    'Debt-to-Equity': {
      label: 'Debt-to-Equity',
      color: '#E57373', // Darker red
    },
  } satisfies ChartConfig
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="principal-risk">
        <div className="flex items-center justify-between">
          <TabsList className="w-[600px]">
            <TabsTrigger value="principal-risk">Principal Risk History</TabsTrigger>
            <TabsTrigger value="credit-line">Credit Line Monitoring</TabsTrigger>
            <TabsTrigger value="risk-classification">Auto-Risk Classification</TabsTrigger>
          </TabsList>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Risk Report
          </Button>
        </div>

        {/* Principal Risk History Tab */}
        <TabsContent value="principal-risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Principal Risk History</CardTitle>
              <CardDescription>
                Historical risk data and fraud detection for principals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Principal</TableHead>
                    <TableHead>Active Bonds</TableHead>
                    <TableHead>Total Value</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Risk Trend</TableHead>
                    <TableHead>Fraud Flags</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {principalRiskHistory.map((principal) => (
                    <TableRow key={principal.id}>
                      <TableCell className="font-medium">{principal.name}</TableCell>
                      <TableCell>{principal.activeBonds}/{principal.totalBonds}</TableCell>
                      <TableCell>{principal.totalValue}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn(
                          principal.riskScore === 'High' ? 'bg-red-100 text-red-800' :
                          principal.riskScore === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        )}>
                          {principal.riskScore}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {principal.riskTrend === 'increasing' && (
                            <TrendingUp className="mr-1 h-4 w-4 text-red-500" />
                          )}
                          {principal.riskTrend === 'decreasing' && (
                            <TrendingDown className="mr-1 h-4 w-4 text-green-500" />
                          )}
                          {principal.riskTrend === 'stable' && (
                            <ArrowRight className="mr-1 h-4 w-4 text-gray-500" />
                          )}
                          <span className="capitalize">{principal.riskTrend}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {principal.fraudFlags > 0 ? (
                          <Badge variant="outline" className="bg-red-100 text-red-800">
                            {principal.fraudFlags} {principal.fraudFlags === 1 ? 'Flag' : 'Flags'}
                          </Badge>
                        ) : (
                          <span className="text-green-600">None</span>
                        )}
                      </TableCell>
                      <TableCell>{principal.lastActivity}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="ml-auto">View All Principals</Button>
            </CardFooter>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Fraud Detection Alerts</CardTitle>
                <CardDescription>Recent fraud flags and suspicious activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2 rounded-lg border p-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-sm font-medium">Metro Constructions</p>
                      <p className="text-xs text-muted-foreground">Multiple bond applications with similar project details</p>
                      <p className="text-xs text-muted-foreground mt-1">Flagged on: 2023-06-15</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg border p-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-sm font-medium">City Infrastructure Ltd</p>
                      <p className="text-xs text-muted-foreground">Discrepancy in financial statements</p>
                      <p className="text-xs text-muted-foreground mt-1">Flagged on: 2023-06-14</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg border p-3">
                    <Info className="mt-0.5 h-5 w-5 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium">Metro Constructions</p>
                      <p className="text-xs text-muted-foreground">Unusual pattern of bond cancellations</p>
                      <p className="text-xs text-muted-foreground mt-1">Flagged on: 2023-06-10</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Financial Trends</CardTitle>
                <CardDescription>Key financial indicators for high-risk principals</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={financialTrendsConfig} className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={financialTrendsData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <ChartTooltip 
                        content={<ChartTooltipContent indicator="line" />}
                        formatter={(value: any) => [`${value}%`, '']}
                      />
                      <Line
                        type="monotone"
                        dataKey="Revenue Growth"
                        stroke={financialTrendsConfig["Revenue Growth"].color}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Profit Margin"
                        stroke={financialTrendsConfig["Profit Margin"].color}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Debt-to-Equity"
                        stroke={financialTrendsConfig["Debt-to-Equity"].color}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Legend />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Credit Line Monitoring Tab */}
        <TabsContent value="credit-line" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Credit Line Monitoring</CardTitle>
              <CardDescription>
                Track exposure per Principal & cumulative insurer risk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Principal</TableHead>
                    <TableHead>Credit Limit</TableHead>
                    <TableHead>Current Exposure</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead>Available Credit</TableHead>
                    <TableHead>Risk Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {creditLineData.map((item) => (
                    <TableRow key={item.principal}>
                      <TableCell className="font-medium">{item.principal}</TableCell>
                      <TableCell>{item.creditLimit}</TableCell>
                      <TableCell>{item.currentExposure}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress 
                            value={item.utilizationPercentage} 
                            className={cn(
                              "h-2 w-[100px]",
                              item.utilizationPercentage > 80 ? "text-red-500" : 
                              item.utilizationPercentage > 60 ? "text-yellow-500" : 
                              "text-green-500"
                            )}
                          />
                          <span className="text-sm">{item.utilizationPercentage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.availableCredit}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn(
                          item.riskCategory === 'High' ? 'bg-red-100 text-red-800' :
                          item.riskCategory === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        )}>
                          {item.riskCategory}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Exposure</CardTitle>
                <CardDescription>Total exposure by industry sector</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={sectorChartConfig} className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReChartsPieChart>
                      <Pie
                        data={portfolioExposureData}
                        dataKey="value"
                        nameKey="sector"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                      >
                        {portfolioExposureData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={sectorChartConfig[entry.sector as keyof typeof sectorChartConfig]?.color || '#8884d8'} 
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
                <CardTitle>Credit Utilization Trends</CardTitle>
                <CardDescription>Monthly credit utilization for top principals</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={creditUtilizationConfig} className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={creditUtilizationData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <ChartTooltip 
                        content={<ChartTooltipContent indicator="line" />}
                        formatter={(value: any) => [`${value}%`, '']}
                      />
                      {Object.keys(creditUtilizationConfig).map((key) => (
                        <Area
                          key={key}
                          type="monotone"
                          dataKey={key}
                          stroke={creditUtilizationConfig[key as keyof typeof creditUtilizationConfig].color}
                          fill={creditUtilizationConfig[key as keyof typeof creditUtilizationConfig].color}
                          fillOpacity={0.3}
                        />
                      ))}
                      <Legend />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Cumulative Risk Exposure</CardTitle>
              <CardDescription>Total insurer risk across all principals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">Total Credit Limit</div>
                    <div className="text-2xl font-bold mt-1">₹13.0 Cr</div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">Current Exposure</div>
                    <div className="text-2xl font-bold mt-1">₹9.8 Cr</div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">Overall Utilization</div>
                    <div className="text-2xl font-bold mt-1">75.4%</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Portfolio Risk Level</span>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      Medium Risk
                    </Badge>
                  </div>
                  <Progress value={75.4} className="h-3" />
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>Low Risk (0-60%)</span>
                    <span>Medium Risk (60-80%)</span>
                    <span>High Risk (80-100%)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Auto-Risk Classification Tab */}
        <TabsContent value="risk-classification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Auto-Risk Classification</CardTitle>
              <CardDescription>
                Automated risk classification criteria and thresholds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {riskClassificationCriteria.map((category) => (
                  <div key={category.category} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">{category.category}</h3>
                      <Badge variant="outline" className={category.color}>
                        {category.category.split(' ')[0]}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Criteria:</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {category.criteria.map((criterion, index) => (
                            <li key={index}>{criterion}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Recommended Action:</h4>
                        <p className="text-sm text-muted-foreground">{category.action}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Risk Classification Distribution</CardTitle>
                <CardDescription>Current distribution of principals by risk category</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={riskChartConfig} className="h-64">
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
                            fill={riskChartConfig[entry.name as keyof typeof riskChartConfig]?.color || '#8884d8'} 
                          />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                      <Legend />
                    </ReChartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="mt-4 flex h-4 overflow-hidden rounded-full bg-gray-200">
                  <div className="bg-[#0ea5e9]" style={{ width: '60%' }}></div>
                  <div className="bg-[#3b82f6]" style={{ width: '30%' }}></div>
                  <div className="bg-[#ef4444]" style={{ width: '10%' }}></div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Risk Threshold Configuration</CardTitle>
                <CardDescription>Adjust risk classification thresholds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm">Credit Utilization Threshold</span>
                      <span className="text-xs font-medium">60% / 80%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200 relative">
                      <div className="absolute top-0 left-[60%] h-4 w-0.5 bg-yellow-500 -translate-y-1"></div>
                      <div className="absolute top-0 left-[80%] h-4 w-0.5 bg-red-500 -translate-y-1"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm">Fraud Flag Threshold</span>
                      <span className="text-xs font-medium">1 / 2</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200 relative">
                      <div className="absolute top-0 left-[50%] h-4 w-0.5 bg-yellow-500 -translate-y-1"></div>
                      <div className="absolute top-0 left-[100%] h-4 w-0.5 bg-red-500 -translate-y-1"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm">Financial Health Score</span>
                      <span className="text-xs font-medium">70 / 50</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200 relative">
                      <div className="absolute top-0 left-[70%] h-4 w-0.5 bg-yellow-500 -translate-y-1"></div>
                      <div className="absolute top-0 left-[50%] h-4 w-0.5 bg-red-500 -translate-y-1"></div>
                    </div>
                  </div>
                </div>
                <Button className="mt-4 w-full">Update Thresholds</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 