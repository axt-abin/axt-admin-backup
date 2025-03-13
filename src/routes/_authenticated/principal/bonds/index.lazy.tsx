import { createLazyFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export const Route = createLazyFileRoute('/_authenticated/principal/bonds/')({
  component: PrincipalBondsPage,
})

function PrincipalBondsPage() {
  const bonds = [
    {
      id: 'B001',
      name: 'Performance Bond',
      amount: '$50,000',
      issueDate: '2023-01-15',
      expiryDate: '2024-01-15',
      status: 'Active',
    },
    {
      id: 'B002',
      name: 'Bid Bond',
      amount: '$25,000',
      issueDate: '2023-02-20',
      expiryDate: '2023-08-20',
      status: 'Expired',
    },
  ]

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">My Bonds</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Active and Past Bonds</CardTitle>
          <CardDescription>
            View all your surety bonds and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bond ID</TableHead>
                <TableHead>Bond Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bonds.map((bond) => (
                <TableRow key={bond.id}>
                  <TableCell className="font-medium">{bond.id}</TableCell>
                  <TableCell>{bond.name}</TableCell>
                  <TableCell>{bond.amount}</TableCell>
                  <TableCell>{bond.issueDate}</TableCell>
                  <TableCell>{bond.expiryDate}</TableCell>
                  <TableCell>
                    <Badge variant={bond.status === 'Active' ? 'default' : 'destructive'}>
                      {bond.status}
                    </Badge>
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