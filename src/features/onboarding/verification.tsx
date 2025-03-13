import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Shield, CheckCircle2, AlertCircle, Clock } from 'lucide-react'

interface VerificationStep {
  id: string
  title: string
  description: string
  status: 'pending' | 'processing' | 'success' | 'error'
  message?: string
}

interface OnboardingVerificationProps {
  onComplete: () => void
  onBack: () => void
}

export function OnboardingVerification({ onComplete, onBack }: OnboardingVerificationProps) {
  const [steps, setSteps] = useState<VerificationStep[]>([
    {
      id: 'gst',
      title: 'GST Verification',
      description: 'Verifying GST registration details',
      status: 'pending',
    },
    {
      id: 'pan',
      title: 'PAN Verification',
      description: 'Verifying PAN details with government records',
      status: 'pending',
    },
    {
      id: 'cibil',
      title: 'CIBIL Score Check',
      description: 'Checking credit score and financial history',
      status: 'pending',
    },
    {
      id: 'documents',
      title: 'Document Verification',
      description: 'Verifying uploaded documents',
      status: 'pending',
    },
  ])
  
  const [currentStep, setCurrentStep] = useState(0)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const startVerification = () => {
    setIsVerifying(true)
    
    // Simulate verification process
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const newStep = prev + 1
        
        // Update progress
        setProgress(Math.min(Math.round((newStep / steps.length) * 100), 100))
        
        if (newStep >= steps.length) {
          clearInterval(interval)
          setIsComplete(true)
          return prev
        }
        
        return newStep
      })
    }, 2000)
    
    // Simulate verification results
    setTimeout(() => {
      setSteps((prev) => {
        const updated = [...prev]
        updated[0] = { ...updated[0], status: 'success', message: 'GST details verified successfully' }
        return updated
      })
    }, 2000)
    
    setTimeout(() => {
      setSteps((prev) => {
        const updated = [...prev]
        updated[1] = { ...updated[1], status: 'success', message: 'PAN details verified successfully' }
        return updated
      })
    }, 4000)
    
    setTimeout(() => {
      setSteps((prev) => {
        const updated = [...prev]
        updated[2] = { ...updated[2], status: 'success', message: 'CIBIL score: 750 (Good)' }
        return updated
      })
    }, 6000)
    
    setTimeout(() => {
      setSteps((prev) => {
        const updated = [...prev]
        updated[3] = { ...updated[3], status: 'success', message: 'All documents verified successfully' }
        return updated
      })
    }, 8000)
  }
  
  useEffect(() => {
    if (isComplete) {
      // Wait a bit before allowing to proceed
      const timer = setTimeout(() => {
        // onComplete()
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [isComplete, onComplete])
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Verification</h3>
        <p className="text-sm text-muted-foreground">
          We'll verify your information to complete the onboarding process.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Verification Process
          </CardTitle>
          <CardDescription>
            This process will verify your business details, documents, and credit information.
          </CardDescription>
          <Progress value={progress} className="h-2 w-full" />
        </CardHeader>
        <CardContent className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-start gap-4 rounded-lg border p-4 ${
                currentStep === index && isVerifying && !isComplete
                  ? 'border-primary/50 bg-primary/5'
                  : ''
              }`}
            >
              <div className="mt-0.5">
                {step.status === 'pending' && (
                  <Clock className="h-5 w-5 text-muted-foreground" />
                )}
                {step.status === 'processing' && (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                )}
                {step.status === 'success' && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                {step.status === 'error' && (
                  <AlertCircle className="h-5 w-5 text-destructive" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{step.title}</h4>
                <p className="text-xs text-muted-foreground">{step.description}</p>
                {step.message && (
                  <p
                    className={`mt-1 text-xs ${
                      step.status === 'success'
                        ? 'text-green-500'
                        : step.status === 'error'
                        ? 'text-destructive'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {step.message}
                  </p>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                {index < currentStep || (isComplete && index === steps.length - 1)
                  ? 'Completed'
                  : index === currentStep && isVerifying && !isComplete
                  ? 'In Progress'
                  : 'Pending'}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} disabled={isVerifying && !isComplete}>
          Back
        </Button>
        
        {!isVerifying && !isComplete && (
          <Button onClick={startVerification}>
            Start Verification
          </Button>
        )}
        
        {isComplete && (
          <Button onClick={onComplete}>
            Complete Onboarding
          </Button>
        )}
      </div>
    </div>
  )
} 