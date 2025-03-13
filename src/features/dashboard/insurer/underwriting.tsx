import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  AlertTriangle, 
  ArrowUpRight, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  FileCheck, 
  FileText, 
  Filter, 
  Search, 
  Settings, 
  XCircle 
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Mock data for underwriting
const pendingApplications = [
  {
    id: 'APP-7890',
    company: 'TechSolutions Ltd',
    bondType: 'Performance Bond',
    amount: '₹25,00,000',
    submittedDate: '2023-06-15',
    status: 'pending_review',
    riskScore: 'Medium',
    assignedTo: 'Rahul Sharma',
  },
  {
    id: 'APP-7891',
    company: 'Global Traders Inc',
    bondType: 'Bid Bond',
    amount: '₹18,50,000',
    submittedDate: '2023-06-14',
    status: 'pending_documents',
    riskScore: 'Low',
    assignedTo: 'Unassigned',
  },
  {
    id: 'APP-7892',
    company: 'Sunrise Exports',
    bondType: 'Advance Payment Bond',
    amount: '₹32,75,000',
    submittedDate: '2023-06-12',
    status: 'pending_approval',
    riskScore: 'Low',
    assignedTo: 'Priya Patel',
  },
  {
    id: 'APP-7893',
    company: 'Metro Constructions',
    bondType: 'Performance Bond',
    amount: '₹45,00,000',
    submittedDate: '2023-06-10',
    status: 'pending_review',
    riskScore: 'High',
    assignedTo: 'Vikram Malhotra',
  },
  {
    id: 'APP-7894',
    company: 'City Infrastructure Ltd',
    bondType: 'Retention Bond',
    amount: '₹38,25,000',
    submittedDate: '2023-06-09',
    status: 'pending_approval',
    riskScore: 'High',
    assignedTo: 'Rahul Sharma',
  },
]

const recentlyApproved = [
  {
    id: 'APP-7880',
    company: 'Horizon Developers',
    bondType: 'Performance Bond',
    amount: '₹22,50,000',
    approvedDate: '2023-06-14',
    riskScore: 'Medium',
    approvedBy: 'Priya Patel',
  },
  {
    id: 'APP-7881',
    company: 'Prime Contractors',
    bondType: 'Bid Bond',
    amount: '₹15,00,000',
    approvedDate: '2023-06-13',
    riskScore: 'Low',
    approvedBy: 'Vikram Malhotra',
  },
  {
    id: 'APP-7882',
    company: 'Evergreen Solutions',
    bondType: 'Advance Payment Bond',
    amount: '₹28,75,000',
    approvedDate: '2023-06-11',
    riskScore: 'Low',
    approvedBy: 'Rahul Sharma',
  },
]

const policyTemplates = [
  {
    id: 'POL-001',
    name: 'Standard Performance Bond',
    description: 'Default template for performance bonds with standard terms',
    lastUpdated: '2023-05-20',
    status: 'active',
  },
  {
    id: 'POL-002',
    name: 'Premium Bid Bond',
    description: 'Enhanced template for high-value bid bonds with additional protections',
    lastUpdated: '2023-05-15',
    status: 'active',
  },
  {
    id: 'POL-003',
    name: 'Basic Retention Bond',
    description: 'Simplified template for retention bonds with minimal requirements',
    lastUpdated: '2023-05-10',
    status: 'active',
  },
  {
    id: 'POL-004',
    name: 'Advance Payment Bond - Construction',
    description: 'Specialized template for advance payment bonds in the construction sector',
    lastUpdated: '2023-05-05',
    status: 'active',
  },
  {
    id: 'POL-005',
    name: 'Performance Bond - IT Services',
    description: 'Customized template for IT service providers with tech-specific clauses',
    lastUpdated: '2023-04-28',
    status: 'draft',
  },
]

const approvalWorkflow = [
  {
    stage: 'Initial Screening',
    description: 'Basic eligibility check and document verification',
    assignedRole: 'Junior Underwriter',
    autoApproval: 'For low-risk applications only',
    timeframe: '1 day',
  },
  {
    stage: 'Risk Assessment',
    description: 'Detailed financial analysis and risk scoring',
    assignedRole: 'Risk Analyst',
    autoApproval: 'None',
    timeframe: '2 days',
  },
  {
    stage: 'Underwriting Review',
    description: 'Comprehensive review of application and risk assessment',
    assignedRole: 'Senior Underwriter',
    autoApproval: 'None',
    timeframe: '1-2 days',
  },
  {
    stage: 'Final Approval',
    description: 'Final decision on bond issuance and terms',
    assignedRole: 'Underwriting Manager',
    autoApproval: 'None',
    timeframe: '1 day',
  },
  {
    stage: 'Bond Issuance',
    description: 'Generation of bond documents and delivery to principal',
    assignedRole: 'Operations Team',
    autoApproval: 'Automatic after approval',
    timeframe: 'Same day',
  },
]

export function Underwriting() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all')

  const filteredApplications = pendingApplications.filter(app => {
    const matchesSearch = app.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    const matchesRisk = riskFilter === 'all' || app.riskScore.toLowerCase() === riskFilter.toLowerCase()
    
    return matchesSearch && matchesStatus && matchesRisk
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_review':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Pending Review</Badge>
      case 'pending_documents':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">Awaiting Documents</Badge>
      case 'pending_approval':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">Pending Approval</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return <Badge variant="outline" className="bg-red-100 text-red-800">High</Badge>
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case 'low':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="applications">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="applications">Bond Applications</TabsTrigger>
          <TabsTrigger value="workflow">Approval Workflow</TabsTrigger>
          <TabsTrigger value="policies">Policy Management</TabsTrigger>
        </TabsList>
        
        {/* Bond Applications Tab */}
        <TabsContent value="applications" className="space-y-4 mt-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search applications..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending_review">Pending Review</SelectItem>
                    <SelectItem value="pending_documents">Awaiting Documents</SelectItem>
                    <SelectItem value="pending_approval">Pending Approval</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by risk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button>
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Pending Applications</CardTitle>
              <CardDescription>
                {filteredApplications.length} applications awaiting review or approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Bond Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.id}</TableCell>
                      <TableCell>{application.company}</TableCell>
                      <TableCell>{application.bondType}</TableCell>
                      <TableCell>{application.amount}</TableCell>
                      <TableCell>{application.submittedDate}</TableCell>
                      <TableCell>{getStatusBadge(application.status)}</TableCell>
                      <TableCell>{getRiskBadge(application.riskScore)}</TableCell>
                      <TableCell>
                        {application.assignedTo === 'Unassigned' ? (
                          <Badge variant="outline" className="bg-gray-100">Unassigned</Badge>
                        ) : (
                          application.assignedTo
                        )}
                      </TableCell>
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
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredApplications.length} of {pendingApplications.length} applications
              </div>
              <Button variant="outline">View All Applications</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recently Approved</CardTitle>
              <CardDescription>
                Bonds approved in the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Bond Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Approved Date</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Approved By</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentlyApproved.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.id}</TableCell>
                      <TableCell>{application.company}</TableCell>
                      <TableCell>{application.bondType}</TableCell>
                      <TableCell>{application.amount}</TableCell>
                      <TableCell>{application.approvedDate}</TableCell>
                      <TableCell>{getRiskBadge(application.riskScore)}</TableCell>
                      <TableCell>{application.approvedBy}</TableCell>
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
              <Button variant="outline" className="ml-auto">View Approval History</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Approval Workflow Tab */}
        <TabsContent value="workflow" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bond Approval Workflow</CardTitle>
              <CardDescription>
                Standard approval process for bond applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {approvalWorkflow.map((stage, index) => (
                  <div key={index} className="relative pl-8 pb-8">
                    {/* Vertical line connecting stages */}
                    {index < approvalWorkflow.length - 1 && (
                      <div className="absolute left-3.5 top-3 h-full w-px bg-border"></div>
                    )}
                    
                    {/* Stage indicator */}
                    <div className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border bg-background">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-lg font-medium">{stage.stage}</h3>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          {stage.timeframe}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{stage.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">Assigned Role</div>
                          <div className="text-sm font-medium">{stage.assignedRole}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">Auto-Approval</div>
                          <div className="text-sm font-medium">{stage.autoApproval}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="ml-auto">
                <Settings className="mr-2 h-4 w-4" />
                Configure Workflow
              </Button>
            </CardFooter>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Average Approval Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3 days</div>
                <p className="text-xs text-muted-foreground">From submission to final approval</p>
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span>12% faster than last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Auto-Approval Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38%</div>
                <p className="text-xs text-muted-foreground">Low-risk applications auto-approved</p>
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span>5% increase from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Rejection Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12%</div>
                <p className="text-xs text-muted-foreground">Applications rejected after review</p>
                <div className="mt-2 flex items-center text-sm text-red-600">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span>2% increase from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Policy Management Tab */}
        <TabsContent value="policies" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="relative w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search policy templates..."
                className="pl-8"
              />
            </div>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Create New Template
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Policy Templates</CardTitle>
              <CardDescription>
                Standard templates for different bond types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {policyTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.id}</TableCell>
                      <TableCell>{template.name}</TableCell>
                      <TableCell className="max-w-md truncate">{template.description}</TableCell>
                      <TableCell>{template.lastUpdated}</TableCell>
                      <TableCell>
                        <Badge variant={template.status === 'active' ? 'default' : 'secondary'}>
                          {template.status === 'active' ? 'Active' : 'Draft'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <FileCheck className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
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
                <CardTitle>Approval Rules</CardTitle>
                <CardDescription>Automated rules for application processing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Auto-approve low-risk applications</p>
                        <p className="text-xs text-muted-foreground">For bonds under ₹10 lakhs with low risk score</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <div>
                        <p className="text-sm font-medium">Flag high-risk applications</p>
                        <p className="text-xs text-muted-foreground">Route to senior underwriter for review</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="text-sm font-medium">Reject incomplete applications</p>
                        <p className="text-xs text-muted-foreground">After 7 days of document request</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Expedite renewal applications</p>
                        <p className="text-xs text-muted-foreground">For existing customers with good history</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-gray-100 text-gray-800">Inactive</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="ml-auto">Manage Rules</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Document Requirements</CardTitle>
                <CardDescription>Required documents by bond type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Performance Bond</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Financial statements (last 3 years)</li>
                      <li>Project contract</li>
                      <li>Company registration documents</li>
                      <li>Bank statements (last 6 months)</li>
                      <li>Previous project completion certificates</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Bid Bond</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Financial statements (last 2 years)</li>
                      <li>Tender documents</li>
                      <li>Company registration documents</li>
                      <li>Bank statements (last 3 months)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Advance Payment Bond</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Financial statements (last 3 years)</li>
                      <li>Project contract</li>
                      <li>Advance payment details</li>
                      <li>Company registration documents</li>
                      <li>Bank statements (last 6 months)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="ml-auto">Edit Requirements</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 