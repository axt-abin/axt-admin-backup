import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

const financialInfoSchema = z.object({
  gstNumber: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, {
    message: 'Please enter a valid GST number',
  }),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
    message: 'Please enter a valid PAN number',
  }),
  annualTurnover: z.string().min(1, { message: 'Annual turnover is required' }),
  turnoverRange: z.string().min(1, { message: 'Please select a turnover range' }),
  bankName: z.string().min(2, { message: 'Bank name must be at least 2 characters' }),
  accountNumber: z.string().min(9, { message: 'Please enter a valid account number' }),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, {
    message: 'Please enter a valid IFSC code',
  }),
  cibilConsent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to CIBIL check',
  }),
})

type FinancialInfoValues = z.infer<typeof financialInfoSchema>

interface OnboardingFinancialInfoProps {
  onComplete: (data: FinancialInfoValues) => void
  onBack: () => void
}

export function OnboardingFinancialInfo({ onComplete, onBack }: OnboardingFinancialInfoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<FinancialInfoValues>({
    resolver: zodResolver(financialInfoSchema),
    defaultValues: {
      gstNumber: '',
      panNumber: '',
      annualTurnover: '',
      turnoverRange: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      cibilConsent: false,
    },
  })
  
  const onSubmit = async (data: FinancialInfoValues) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Financial Info:', data)
    setIsSubmitting(false)
    onComplete(data)
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Financial Information</h3>
        <p className="text-sm text-muted-foreground">
          Provide your financial details for verification.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="gstNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GST Number</FormLabel>
                  <FormControl>
                    <Input placeholder="22AAAAA0000A1Z5" {...field} />
                  </FormControl>
                  <FormDescription>
                    15-character GST identification number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="panNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PAN Number</FormLabel>
                  <FormControl>
                    <Input placeholder="AAAAA0000A" {...field} />
                  </FormControl>
                  <FormDescription>
                    10-character permanent account number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="annualTurnover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Turnover (₹)</FormLabel>
                  <FormControl>
                    <Input placeholder="1000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="turnoverRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Turnover Range</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select turnover range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="less_than_40L">Less than ₹40 Lakhs</SelectItem>
                      <SelectItem value="40L_to_1Cr">₹40 Lakhs to ₹1 Crore</SelectItem>
                      <SelectItem value="1Cr_to_5Cr">₹1 Crore to ₹5 Crore</SelectItem>
                      <SelectItem value="5Cr_to_20Cr">₹5 Crore to ₹20 Crore</SelectItem>
                      <SelectItem value="more_than_20Cr">More than ₹20 Crore</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <h4 className="mb-3 text-sm font-medium">Bank Details</h4>
            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input placeholder="HDFC Bank" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input placeholder="123456789012" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ifscCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IFSC Code</FormLabel>
                    <FormControl>
                      <Input placeholder="HDFC0000123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="cibilConsent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>CIBIL Check Consent</FormLabel>
                  <FormDescription>
                    I consent to AxiTrust performing a CIBIL check to verify my credit history.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Continue'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
} 