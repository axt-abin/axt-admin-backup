import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { IconAlertCircle, IconCheck } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const companyInfoSchema = z.object({
  companyName: z.string().min(1, { message: 'Company name is required' }),
  companyType: z.enum(['private', 'public', 'llp', 'partnership', 'proprietorship'], {
    required_error: 'Company type is required',
  }),
  registrationNumber: z.string().min(1, { message: 'Registration number is required' }),
  gstNumber: z.string().min(15, { message: 'GST number must be 15 characters' }).max(15),
  panNumber: z.string().min(10, { message: 'PAN number must be 10 characters' }).max(10),
  incorporationDate: z.string().min(1, { message: 'Incorporation date is required' }),
})

const financialInfoSchema = z.object({
  annualTurnover: z.string().min(1, { message: 'Annual turnover is required' }),
  netWorth: z.string().min(1, { message: 'Net worth is required' }),
  creditScore: z.string().min(1, { message: 'Credit score is required' }),
  bankName: z.string().min(1, { message: 'Bank name is required' }),
  accountNumber: z.string().min(1, { message: 'Account number is required' }),
  ifscCode: z.string().min(1, { message: 'IFSC code is required' }),
})

const addressInfoSchema = z.object({
  addressLine1: z.string().min(1, { message: 'Address line 1 is required' }),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  pincode: z.string().min(6, { message: 'Pincode must be 6 digits' }).max(6),
  country: z.string().min(1, { message: 'Country is required' }),
})

// Prefilled data for testing
const prefilledCompanyInfo = {
  companyName: 'TechSolutions Pvt Ltd',
  companyType: 'private',
  registrationNumber: 'U72200MH2020PTC123456',
  gstNumber: '27AABCT1234A1Z5',
  panNumber: 'AABCT1234A',
  incorporationDate: '2020-05-15',
}

const prefilledFinancialInfo = {
  annualTurnover: '1,50,00,000',
  netWorth: '75,00,000',
  creditScore: '750',
  bankName: 'HDFC Bank',
  accountNumber: '12345678901234',
  ifscCode: 'HDFC0001234',
}

const prefilledAddressInfo = {
  addressLine1: '123, Tech Park',
  addressLine2: 'Whitefield',
  city: 'Bangalore',
  state: 'Karnataka',
  pincode: '560066',
  country: 'India',
}

export default function KycPage() {
  const navigate = useNavigate()
  const { user, updateUserKycStatus } = useAuthStore((state) => state.auth)
  const [activeTab, setActiveTab] = useState('company')
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationSuccess, setVerificationSuccess] = useState(false)
  const [error, setError] = useState('')

  // Initialize forms with prefilled data
  const companyForm = useForm({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: prefilledCompanyInfo,
  })

  const financialForm = useForm({
    resolver: zodResolver(financialInfoSchema),
    defaultValues: prefilledFinancialInfo,
  })

  const addressForm = useForm({
    resolver: zodResolver(addressInfoSchema),
    defaultValues: prefilledAddressInfo,
  })

  // Don't render anything if not a principal
  if (user?.userType !== 'principal') {
    navigate({ to: '/' })
    return null
  }

  const handleVerify = () => {
    setIsVerifying(true)
    setError('')

    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false)
      setVerificationSuccess(true)

      // Update KYC status in auth store
      updateUserKycStatus(true)

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate({ to: '/' })
      }, 2000)
    }, 2000)
  }

  const handleSubmit = () => {
    // Validate all forms
    const isCompanyValid = companyForm.formState.isValid
    const isFinancialValid = financialForm.formState.isValid
    const isAddressValid = addressForm.formState.isValid

    if (!isCompanyValid || !isFinancialValid || !isAddressValid) {
      setError('Please complete all required fields in all sections')
      return
    }

    // Proceed with verification
    handleVerify()
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Business KYC Verification</CardTitle>
          <CardDescription>
            Please provide your business details for verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <IconAlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {verificationSuccess ? (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <IconCheck className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Verification Successful</AlertTitle>
              <AlertDescription className="text-green-700">
                Your business has been successfully verified. Redirecting to dashboard...
              </AlertDescription>
            </Alert>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="company">Company Information</TabsTrigger>
                <TabsTrigger value="financial">Financial Details</TabsTrigger>
                <TabsTrigger value="address">Address Details</TabsTrigger>
              </TabsList>

              <TabsContent value="company">
                <Form {...companyForm}>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={companyForm.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={companyForm.control}
                        name="companyType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select company type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="private">Private Limited</SelectItem>
                                <SelectItem value="public">Public Limited</SelectItem>
                                <SelectItem value="llp">LLP</SelectItem>
                                <SelectItem value="partnership">Partnership</SelectItem>
                                <SelectItem value="proprietorship">Proprietorship</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={companyForm.control}
                        name="registrationNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Registration Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={companyForm.control}
                        name="incorporationDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Incorporation Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={companyForm.control}
                        name="gstNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GST Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>15 character GST number</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={companyForm.control}
                        name="panNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>PAN Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>10 character PAN number</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
                <div className="flex justify-end mt-6">
                  <Button onClick={() => setActiveTab('financial')}>Next</Button>
                </div>
              </TabsContent>

              <TabsContent value="financial">
                <Form {...financialForm}>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={financialForm.control}
                        name="annualTurnover"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Annual Turnover (INR)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={financialForm.control}
                        name="netWorth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Net Worth (INR)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={financialForm.control}
                        name="creditScore"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Credit Score</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={financialForm.control}
                        name="bankName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bank Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={financialForm.control}
                        name="accountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={financialForm.control}
                        name="ifscCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>IFSC Code</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setActiveTab('company')}>
                    Previous
                  </Button>
                  <Button onClick={() => setActiveTab('address')}>Next</Button>
                </div>
              </TabsContent>

              <TabsContent value="address">
                <Form {...addressForm}>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={addressForm.control}
                        name="addressLine1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Line 1</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={addressForm.control}
                        name="addressLine2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Line 2 (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={addressForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={addressForm.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={addressForm.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pincode</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={addressForm.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setActiveTab('financial')}>
                    Previous
                  </Button>
                  <Button onClick={handleSubmit} disabled={isVerifying}>
                    {isVerifying ? 'Verifying...' : 'Complete Verification'}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 