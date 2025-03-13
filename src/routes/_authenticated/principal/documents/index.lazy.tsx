import { createLazyFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { UploadIcon, FileIcon, TrashIcon } from 'lucide-react'

export const Route = createLazyFileRoute('/_authenticated/principal/documents/')({
  component: PrincipalDocumentsPage,
})

function PrincipalDocumentsPage() {
  const documents = [
    {
      id: 'D001',
      name: 'Financial Statement 2023',
      type: 'PDF',
      uploadDate: '2023-03-15',
      size: '2.4 MB',
    },
    {
      id: 'D002',
      name: 'Business License',
      type: 'PDF',
      uploadDate: '2023-01-10',
      size: '1.2 MB',
    },
  ]

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Document Upload</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Document</CardTitle>
            <CardDescription>
              Upload documents required for bond applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center">
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop files here, or click to select files
              </p>
              <Button className="mt-4">
                Select Files
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Document Requirements</CardTitle>
            <CardDescription>
              Documents needed for bond approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FileIcon className="mr-2 h-4 w-4" />
                <span>Financial Statements (Last 2 years)</span>
              </li>
              <li className="flex items-center">
                <FileIcon className="mr-2 h-4 w-4" />
                <span>Business License</span>
              </li>
              <li className="flex items-center">
                <FileIcon className="mr-2 h-4 w-4" />
                <span>Tax Returns</span>
              </li>
              <li className="flex items-center">
                <FileIcon className="mr-2 h-4 w-4" />
                <span>Project Contracts (if applicable)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
          <CardDescription>
            Manage your uploaded documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.uploadDate}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="h-4 w-4" />
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