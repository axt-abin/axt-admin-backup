import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Upload, X, File } from 'lucide-react'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const documentsSchema = z.object({
  gstCertificate: z.any()
    .refine((file) => file && file.length > 0, { message: 'GST Certificate is required' }),
  panCard: z.any()
    .refine((file) => file && file.length > 0, { message: 'PAN Card is required' }),
  financialStatements: z.any()
    .refine((file) => file && file.length > 0, { message: 'Financial Statements are required' }),
  bankStatement: z.any()
    .refine((file) => file && file.length > 0, { message: 'Bank Statement is required' }),
  additionalDocuments: z.any().optional(),
})

type DocumentsValues = z.infer<typeof documentsSchema>

interface OnboardingDocumentsProps {
  onComplete: (data: DocumentsValues) => void
  onBack: () => void
}

export function OnboardingDocuments({ onComplete, onBack }: OnboardingDocumentsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({
    gstCertificate: [],
    panCard: [],
    financialStatements: [],
    bankStatement: [],
    additionalDocuments: [],
  })
  
  const form = useForm<DocumentsValues>({
    resolver: zodResolver(documentsSchema),
    defaultValues: {
      gstCertificate: undefined,
      panCard: undefined,
      financialStatements: undefined,
      bankStatement: undefined,
      additionalDocuments: undefined,
    },
  })
  
  const handleFileChange = (fieldName: keyof DocumentsValues, files: FileList | null) => {
    if (!files) return
    
    const fileArray = Array.from(files)
    
    // Check file size
    const validFiles = fileArray.filter(file => file.size <= MAX_FILE_SIZE)
    
    if (validFiles.length !== fileArray.length) {
      form.setError(fieldName as any, {
        type: 'manual',
        message: 'One or more files exceed the maximum size of 5MB',
      })
      return
    }
    
    // Update form value
    form.setValue(fieldName as any, files)
    
    // Update uploaded files state
    setUploadedFiles(prev => ({
      ...prev,
      [fieldName]: fileArray,
    }))
  }
  
  const handleRemoveFile = (fieldName: keyof DocumentsValues, index: number) => {
    const updatedFiles = [...uploadedFiles[fieldName]]
    updatedFiles.splice(index, 1)
    
    setUploadedFiles(prev => ({
      ...prev,
      [fieldName]: updatedFiles,
    }))
    
    // Update form value
    if (updatedFiles.length === 0) {
      form.setValue(fieldName as any, undefined)
      form.setError(fieldName as any, {
        type: 'manual',
        message: `${fieldName.replace(/([A-Z])/g, ' $1').trim()} is required`,
      })
    } else {
      const dataTransfer = new DataTransfer()
      updatedFiles.forEach(file => dataTransfer.items.add(file))
      form.setValue(fieldName as any, dataTransfer.files)
    }
  }
  
  const onSubmit = async (data: DocumentsValues) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Documents:', data)
    setIsSubmitting(false)
    onComplete(data)
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Document Upload</h3>
        <p className="text-sm text-muted-foreground">
          Upload the required documents for verification.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="gstCertificate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GST Certificate</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="gstCertificate"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PDF, JPG or PNG (MAX. 5MB)
                            </p>
                          </div>
                          <input
                            id="gstCertificate"
                            type="file"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange('gstCertificate', e.target.files)}
                          />
                        </label>
                      </div>
                      
                      {uploadedFiles.gstCertificate.length > 0 && (
                        <div className="space-y-2">
                          {uploadedFiles.gstCertificate.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                              <div className="flex items-center space-x-2">
                                <File className="h-4 w-4 text-blue-500" />
                                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                                <span className="text-xs text-gray-500">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveFile('gstCertificate', index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="panCard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PAN Card</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="panCard"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PDF, JPG or PNG (MAX. 5MB)
                            </p>
                          </div>
                          <input
                            id="panCard"
                            type="file"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange('panCard', e.target.files)}
                          />
                        </label>
                      </div>
                      
                      {uploadedFiles.panCard.length > 0 && (
                        <div className="space-y-2">
                          {uploadedFiles.panCard.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                              <div className="flex items-center space-x-2">
                                <File className="h-4 w-4 text-blue-500" />
                                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                                <span className="text-xs text-gray-500">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveFile('panCard', index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="financialStatements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Financial Statements</FormLabel>
                  <FormDescription>
                    Upload last 2 years of financial statements
                  </FormDescription>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="financialStatements"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PDF, JPG or PNG (MAX. 5MB)
                            </p>
                          </div>
                          <input
                            id="financialStatements"
                            type="file"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange('financialStatements', e.target.files)}
                          />
                        </label>
                      </div>
                      
                      {uploadedFiles.financialStatements.length > 0 && (
                        <div className="space-y-2">
                          {uploadedFiles.financialStatements.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                              <div className="flex items-center space-x-2">
                                <File className="h-4 w-4 text-blue-500" />
                                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                                <span className="text-xs text-gray-500">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveFile('financialStatements', index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="bankStatement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Statement</FormLabel>
                  <FormDescription>
                    Upload last 6 months of bank statements
                  </FormDescription>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="bankStatement"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PDF, JPG or PNG (MAX. 5MB)
                            </p>
                          </div>
                          <input
                            id="bankStatement"
                            type="file"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange('bankStatement', e.target.files)}
                          />
                        </label>
                      </div>
                      
                      {uploadedFiles.bankStatement.length > 0 && (
                        <div className="space-y-2">
                          {uploadedFiles.bankStatement.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                              <div className="flex items-center space-x-2">
                                <File className="h-4 w-4 text-blue-500" />
                                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                                <span className="text-xs text-gray-500">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveFile('bankStatement', index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="additionalDocuments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Documents (Optional)</FormLabel>
                  <FormDescription>
                    Upload any additional supporting documents
                  </FormDescription>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="additionalDocuments"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PDF, JPG or PNG (MAX. 5MB)
                            </p>
                          </div>
                          <input
                            id="additionalDocuments"
                            type="file"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            multiple
                            onChange={(e) => handleFileChange('additionalDocuments', e.target.files)}
                          />
                        </label>
                      </div>
                      
                      {uploadedFiles.additionalDocuments.length > 0 && (
                        <div className="space-y-2">
                          {uploadedFiles.additionalDocuments.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                              <div className="flex items-center space-x-2">
                                <File className="h-4 w-4 text-blue-500" />
                                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                                <span className="text-xs text-gray-500">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveFile('additionalDocuments', index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Uploading...' : 'Continue'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
} 