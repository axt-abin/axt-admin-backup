import { createLazyFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const Route = createLazyFileRoute('/_authenticated/principal/claims/')({
  component: PrincipalClaimsPage,
})

function PrincipalClaimsPage() {
  const claims = [
    {
      id: 'C001',
      bondId: 'B001',
      bondName: 'Performance Bond',
      claimant: 'City of Springfield',
      amount: '$15,000',
      filingDate: '2023-09-15',
      status: 'Under Review',
    },
    {
      id: 'C002',
      bondId: 'B003',
      bondName: 'Maintenance Bond',
      claimant: 'State Department of Transportation',
      amount: '$8,500',
      filingDate: '2023-08-10',
      status: 'Disputed',
    },
    {
      id: 'C003',
      bondId: 'B002',
      bondName: 'Bid Bond',
      claimant: 'County Public Works',
      amount: '$5,000',
      filingDate: '2023-07-22',
      status: 'Resolved',
    },
  ]

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Claims Tracking</h1>
      
      <Tabs defaultValue="active" className="mb-6">
        <TabsList>
          <TabsTrigger value="active">Active Claims</TabsTrigger>
          <TabsTrigger value="resolved">Resolved Claims</TabsTrigger>
          <TabsTrigger value="all">All Claims</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Claims</CardTitle>
              <CardDescription>
                Claims that are currently under review or disputed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Bond</TableHead>
                    <TableHead>Claimant</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Filing Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claims.filter(claim => claim.status !== 'Resolved').map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{claim.id}</TableCell>
                      <TableCell>{claim.bondName}</TableCell>
                      <TableCell>{claim.claimant}</TableCell>
                      <TableCell>{claim.amount}</TableCell>
                      <TableCell>{claim.filingDate}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            claim.status === 'Under Review' ? 'outline' : 
                            claim.status === 'Disputed' ? 'destructive' : 'default'
                          }
                        >
                          {claim.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resolved" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Claims</CardTitle>
              <CardDescription>
                Claims that have been settled or closed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Bond</TableHead>
                    <TableHead>Claimant</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Filing Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claims.filter(claim => claim.status === 'Resolved').map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{claim.id}</TableCell>
                      <TableCell>{claim.bondName}</TableCell>
                      <TableCell>{claim.claimant}</TableCell>
                      <TableCell>{claim.amount}</TableCell>
                      <TableCell>{claim.filingDate}</TableCell>
                      <TableCell>
                        <Badge variant="default">
                          {claim.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Claims</CardTitle>
              <CardDescription>
                Complete history of all claims against your bonds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Bond</TableHead>
                    <TableHead>Claimant</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Filing Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{claim.id}</TableCell>
                      <TableCell>{claim.bondName}</TableCell>
                      <TableCell>{claim.claimant}</TableCell>
                      <TableCell>{claim.amount}</TableCell>
                      <TableCell>{claim.filingDate}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            claim.status === 'Under Review' ? 'outline' : 
                            claim.status === 'Disputed' ? 'destructive' : 'default'
                          }
                        >
                          {claim.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 