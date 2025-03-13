import { createLazyFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export const Route = createLazyFileRoute('/_authenticated/principal/renewals/')({
  component: PrincipalRenewalsPage,
})

function PrincipalRenewalsPage() {
  const renewals = [
    {
      id: 'R001',
      bondId: 'B001',
      bondName: 'Performance Bond',
      expiryDate: '2024-01-15',
      renewalRequestDate: '2023-11-20',
      status: 'Pending',
    },
    {
      id: 'R002',
      bondId: 'B003',
      bondName: 'Maintenance Bond',
      expiryDate: '2023-12-10',
      renewalRequestDate: '2023-10-15',
      status: 'Approved',
    },
  ]

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Renewal Requests</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Bonds Expiring Soon</CardTitle>
          <CardDescription>
            Bonds that will expire within the next 90 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="mr-4 text-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-amber-800">Performance Bond (B001) expires in 45 days</h4>
              <p className="text-sm text-amber-700">Request a renewal to maintain continuous coverage</p>
            </div>
            <Button className="ml-auto" variant="outline">
              Request Renewal
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Renewal History</CardTitle>
          <CardDescription>
            Track the status of your bond renewal requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Bond</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renewals.map((renewal) => (
                <TableRow key={renewal.id}>
                  <TableCell className="font-medium">{renewal.id}</TableCell>
                  <TableCell>{renewal.bondName} ({renewal.bondId})</TableCell>
                  <TableCell>{renewal.expiryDate}</TableCell>
                  <TableCell>{renewal.renewalRequestDate}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        renewal.status === 'Approved' ? 'default' : 
                        renewal.status === 'Pending' ? 'outline' : 'destructive'
                      }
                    >
                      {renewal.status}
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
    </div>
  )
} 