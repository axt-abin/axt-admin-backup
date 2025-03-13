import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

interface OnboardingCompleteProps {
  onBack: () => void
}

export function OnboardingComplete({ onBack }: OnboardingCompleteProps) {
  const navigate = useNavigate()
  
  const handleGoToDashboard = () => {
    navigate({ to: '/' })
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Onboarding Complete</h3>
        <p className="text-sm text-muted-foreground">
          Congratulations! Your business has been successfully verified.
        </p>
      </div>
      
      <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle>Verification Successful</CardTitle>
              <CardDescription>Your business is now verified on AxiTrust</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <h4 className="text-sm font-medium">What's Next?</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="mt-0.5 h-4 w-4 rounded-full bg-green-100 text-center text-[10px] font-bold leading-4 text-green-600 dark:bg-green-900 dark:text-green-400">
                  1
                </div>
                <span>Access your Principal dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-0.5 h-4 w-4 rounded-full bg-green-100 text-center text-[10px] font-bold leading-4 text-green-600 dark:bg-green-900 dark:text-green-400">
                  2
                </div>
                <span>Apply for surety bonds with verified status</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-0.5 h-4 w-4 rounded-full bg-green-100 text-center text-[10px] font-bold leading-4 text-green-600 dark:bg-green-900 dark:text-green-400">
                  3
                </div>
                <span>Track your applications and manage your bonds</span>
              </li>
            </ul>
          </div>
          
          <div className="rounded-lg border bg-card p-4">
            <h4 className="text-sm font-medium">Your Verification Details</h4>
            <div className="mt-2 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Verification ID</span>
                <span className="font-medium">VRF-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Verification Date</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium text-green-600">Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CIBIL Score</span>
                <span className="font-medium">750 (Good)</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            A verification certificate has been sent to your registered email address.
          </p>
        </CardFooter>
      </Card>
      
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleGoToDashboard} className="gap-2">
          Go to Dashboard <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 