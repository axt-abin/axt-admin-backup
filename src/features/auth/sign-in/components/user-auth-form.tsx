import { HTMLAttributes, useState, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { useAuthStore, UserType } from '@/stores/authStore'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'

type UserAuthFormProps = HTMLAttributes<HTMLDivElement> & {
  defaultUserType?: UserType;
  hideUserTypeSelect?: boolean;
}

// Email/Password schema
const emailPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
  userType: z.enum(['principal', 'beneficiary', 'insurer'], {
    required_error: 'Please select a user type',
  }),
})

// Phone/OTP schema
const phoneOtpSchema = z.object({
  phone: z
    .string()
    .min(1, { message: 'Please enter your phone number' })
    .regex(/^\+?[0-9]{10,15}$/, { message: 'Invalid phone number' }),
  otp: z
    .string()
    .min(1, { message: 'Please enter the OTP' })
    .length(6, { message: 'OTP must be 6 digits' })
    .regex(/^[0-9]+$/, { message: 'OTP must contain only numbers' }),
  userType: z.enum(['principal', 'beneficiary', 'insurer'], {
    required_error: 'Please select a user type',
  }),
})

// Default credentials for each user type
const defaultCredentials = {
  principal: {
    email: 'principal@axitrust.com',
    password: 'principal123',
    phone: '+919876543210',
    otp: '123456'
  },
  beneficiary: {
    email: 'beneficiary@axitrust.com',
    password: 'beneficiary123',
    phone: '+919876543211',
    otp: '123456'
  },
  insurer: {
    email: 'insurer@axitrust.com',
    password: 'insurer123',
    phone: '+919876543212',
    otp: '123456'
  }
}

export function UserAuthForm({ 
  className, 
  defaultUserType, 
  hideUserTypeSelect = false,
  ...props 
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email')
  const [userType, setUserType] = useState<UserType>(
    defaultUserType || 'principal'
  )
  const [otpSent, setOtpSent] = useState(false)
  const navigate = useNavigate()
  const { setUser, setAccessToken } = useAuthStore((state) => state.auth)

  // Email/Password form
  const emailPasswordForm = useForm<z.infer<typeof emailPasswordSchema>>({
    resolver: zodResolver(emailPasswordSchema),
    defaultValues: {
      email: defaultUserType ? defaultCredentials[defaultUserType].email : '',
      password: defaultUserType ? defaultCredentials[defaultUserType].password : '',
      userType: defaultUserType,
    },
  })

  // Phone/OTP form
  const phoneOtpForm = useForm<z.infer<typeof phoneOtpSchema>>({
    resolver: zodResolver(phoneOtpSchema),
    defaultValues: {
      phone: defaultUserType ? defaultCredentials[defaultUserType].phone : '',
      otp: '',
      userType: defaultUserType,
    },
  })

  // Update form values when defaultUserType changes
  useEffect(() => {
    if (defaultUserType) {
      emailPasswordForm.setValue('email', defaultCredentials[defaultUserType].email);
      emailPasswordForm.setValue('password', defaultCredentials[defaultUserType].password);
      emailPasswordForm.setValue('userType', defaultUserType);
      
      phoneOtpForm.setValue('phone', defaultCredentials[defaultUserType].phone);
      phoneOtpForm.setValue('userType', defaultUserType);
    }
  }, [defaultUserType, emailPasswordForm, phoneOtpForm]);

  // Handle user type change to update credentials
  const handleUserTypeChange = (value: string) => {
    const userType = value as UserType;
    
    // Update both forms
    emailPasswordForm.setValue('userType', userType);
    phoneOtpForm.setValue('userType', userType);
    
    if (defaultCredentials[userType]) {
      emailPasswordForm.setValue('email', defaultCredentials[userType].email);
      emailPasswordForm.setValue('password', defaultCredentials[userType].password);
      
      phoneOtpForm.setValue('phone', defaultCredentials[userType].phone);
    }
  };

  // Handle email/password login
  function onEmailPasswordSubmit(data: z.infer<typeof emailPasswordSchema>) {
    setIsLoading(true)
    
    // Mock authentication
    setTimeout(() => {
      // Create a mock user based on the selected role
      const mockUser = {
        accountNo: `ACC-${Math.floor(Math.random() * 10000)}`,
        email: data.email,
        role: ['user'],
        userType: data.userType as UserType,
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
        kycVerified: true, // Set to true for sign-in users
        consentProvided: true, // Set to true for sign-in users
      }
      
      // Set the user in the auth store
      setUser(mockUser)
      setAccessToken('mock-token')
      
      setIsLoading(false)
      
      // Direct to dashboard for all sign-in users
      navigate({ to: '/' })
    }, 1500)
  }

  // Handle phone/OTP login
  function onPhoneOtpSubmit(data: z.infer<typeof phoneOtpSchema>) {
    setIsLoading(true)
    
    // Mock authentication
    setTimeout(() => {
      // Create a mock user based on the selected role
      const mockUser = {
        accountNo: `ACC-${Math.floor(Math.random() * 10000)}`,
        phone: data.phone,
        email: defaultUserType ? defaultCredentials[data.userType].email : `user-${Math.floor(Math.random() * 10000)}@example.com`,
        role: ['user'],
        userType: data.userType as UserType,
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
        kycVerified: true, // Set to true for sign-in users
        consentProvided: true, // Set to true for sign-in users
      }
      
      // Set the user in the auth store
      setUser(mockUser)
      setAccessToken('mock-token')
      
      setIsLoading(false)
      
      // Direct to dashboard for all sign-in users
      navigate({ to: '/' })
    }, 1500)
  }

  // Handle sending OTP
  const onSendOtp = () => {
    setIsLoading(true)
    
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      
      // For testing, prefill OTP if we have a default user type
      if (defaultUserType) {
        phoneOtpForm.setValue('otp', defaultCredentials[defaultUserType].otp);
      }
    }, 2000)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Tabs
        defaultValue={authMethod}
        onValueChange={(value) => setAuthMethod(value as 'email' | 'phone')}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="phone">Phone</TabsTrigger>
        </TabsList>
        <TabsContent value="email" className="mt-4">
          <Form {...emailPasswordForm}>
            <form onSubmit={emailPasswordForm.handleSubmit(onEmailPasswordSubmit)} className="space-y-4">
              {!hideUserTypeSelect && (
                <div className="space-y-2">
                  <Label htmlFor="userType">Login as</Label>
                  <Select
                    value={userType}
                    onValueChange={(value: UserType) => {
                      setUserType(value)
                      emailPasswordForm.setValue('userType', value)
                      // Prefill credentials based on selected user type
                      emailPasswordForm.setValue('email', defaultCredentials[value].email)
                      emailPasswordForm.setValue('password', defaultCredentials[value].password)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="principal">Principal</SelectItem>
                      <SelectItem value="beneficiary">Beneficiary</SelectItem>
                      <SelectItem value="insurer">Insurer</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Test credentials will be prefilled based on selected role
                  </p>
                </div>
              )}
              
              <FormField
                control={emailPasswordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={emailPasswordForm.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <div className='flex items-center justify-between'>
                      <FormLabel>Password</FormLabel>
                      <Link
                        to='/forgot-password'
                        className='text-sm font-medium text-muted-foreground hover:opacity-75'
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput placeholder='********' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button className='mt-2' disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="phone" className="mt-4">
          <Form {...phoneOtpForm}>
            <form onSubmit={phoneOtpForm.handleSubmit(onPhoneOtpSubmit)} className="space-y-4">
              {!hideUserTypeSelect && (
                <div className="space-y-2">
                  <Label htmlFor="userType">Login as</Label>
                  <Select
                    value={userType}
                    onValueChange={(value: UserType) => {
                      setUserType(value)
                      phoneOtpForm.setValue('userType', value)
                      // Prefill credentials based on selected user type
                      phoneOtpForm.setValue('phone', defaultCredentials[value].phone)
                      if (otpSent) {
                        phoneOtpForm.setValue('otp', defaultCredentials[value].otp)
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="principal">Principal</SelectItem>
                      <SelectItem value="beneficiary">Beneficiary</SelectItem>
                      <SelectItem value="insurer">Insurer</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Test credentials will be prefilled based on selected role
                  </p>
                </div>
              )}
              
              <FormField
                control={phoneOtpForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input 
                          placeholder="+91 9876543210" 
                          {...field} 
                          disabled={otpSent && isLoading}
                        />
                      </FormControl>
                      {!otpSent && (
                        <Button 
                          type="button" 
                          onClick={onSendOtp} 
                          disabled={isLoading}
                        >
                          {isLoading ? 'Sending...' : 'Send OTP'}
                        </Button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {otpSent && (
                <FormField
                  control={phoneOtpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OTP</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter OTP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {otpSent && (
                <Button className='mt-2' disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Verify & Login'}
                </Button>
              )}
              
              {otpSent && (
                <Button 
                  variant="link" 
                  className="mt-0 p-0 h-auto" 
                  type="button"
                  onClick={() => setOtpSent(false)}
                  disabled={isLoading}
                >
                  Didn't receive OTP? Resend
                </Button>
              )}
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
