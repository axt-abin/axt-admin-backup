import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const businessInfoSchema = z.object({
  companyName: z.string().min(2, { message: 'Company name must be at least 2 characters' }),
  registrationNumber: z.string().min(5, { message: 'Registration number must be at least 5 characters' }),
  businessType: z.string().min(1, { message: 'Please select a business type' }),
  yearEstablished: z.string().regex(/^\d{4}$/, { message: 'Please enter a valid year (YYYY)' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters' }),
  state: z.string().min(2, { message: 'State must be at least 2 characters' }),
  pincode: z.string().regex(/^\d{6}$/, { message: 'Pincode must be 6 digits' }),
})

type BusinessInfoValues = z.infer<typeof businessInfoSchema>

interface OnboardingBusinessInfoProps {
  onComplete: (data: BusinessInfoValues) => void
}

export function OnboardingBusinessInfo({ onComplete }: OnboardingBusinessInfoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<BusinessInfoValues>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      companyName: '',
      registrationNumber: '',
      businessType: '',
      yearEstablished: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
    },
  })
  
  const onSubmit = async (data: BusinessInfoValues) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Business Info:', data)
    setIsSubmitting(false)
    onComplete(data)
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Business Information</h3>
        <p className="text-sm text-muted-foreground">
          Provide your business details for verification.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Corporation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number</FormLabel>
                  <FormControl>
                    <Input placeholder="CIN12345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="private_limited">Private Limited</SelectItem>
                      <SelectItem value="public_limited">Public Limited</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="llp">Limited Liability Partnership</SelectItem>
                      <SelectItem value="proprietorship">Proprietorship</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="yearEstablished"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Established</FormLabel>
                  <FormControl>
                    <Input placeholder="2010" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Business Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Mumbai" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Maharashtra" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input placeholder="400001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Continue'}
          </Button>
        </form>
      </Form>
    </div>
  )
} 