import { useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { IconAlertCircle } from '@tabler/icons-react'

export default function ConsentPage() {
  const navigate = useNavigate()
  const { user, updateUserConsentStatus } = useAuthStore((state) => state.auth)
  const [consents, setConsents] = useState({
    gst: true,
    pan: true,
    cibil: true,
    terms: true,
  })
  const [error, setError] = useState('')

  useEffect(() => {
    // Redirect if not a principal
    if (user?.userType !== 'principal') {
      navigate({ to: '/' })
    }
  }, [user, navigate])

  const handleConsentChange = (key: keyof typeof consents, checked: boolean) => {
    setConsents((prev) => ({ ...prev, [key]: checked }))
  }

  const handleSubmit = () => {
    if (!Object.values(consents).every(Boolean)) {
      setError('Please provide consent for all items to proceed.')
      return
    }

    // Update consent status in auth store
    updateUserConsentStatus(true)
    
    // Navigate to dashboard
    navigate({ to: '/' })
  }

  // Don't render anything if not a principal
  if (user?.userType !== 'principal') {
    return null
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Consent for Verification</CardTitle>
          <CardDescription>
            As a Principal applying for a surety bond, we need your consent to verify your information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <IconAlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="gst" 
                checked={consents.gst}
                onCheckedChange={(checked) => 
                  handleConsentChange('gst', checked as boolean)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="gst" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  GST Verification
                </Label>
                <p className="text-sm text-muted-foreground">
                  I consent to the verification of my GST registration details.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="pan" 
                checked={consents.pan}
                onCheckedChange={(checked) => 
                  handleConsentChange('pan', checked as boolean)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="pan" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  PAN Verification
                </Label>
                <p className="text-sm text-muted-foreground">
                  I consent to the verification of my PAN details.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="cibil" 
                checked={consents.cibil}
                onCheckedChange={(checked) => 
                  handleConsentChange('cibil', checked as boolean)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="cibil" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  CIBIL Score Check
                </Label>
                <p className="text-sm text-muted-foreground">
                  I consent to the verification of my CIBIL/credit score.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={consents.terms}
                onCheckedChange={(checked) => 
                  handleConsentChange('terms', checked as boolean)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Terms & Conditions
                </Label>
                <p className="text-sm text-muted-foreground">
                  I agree to the terms and conditions of AxiTrust Surety Bond Management System.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full">
            Provide Consent & Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 