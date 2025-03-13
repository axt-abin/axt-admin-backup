import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Shield, Building, FileCheck, CreditCard, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import { OnboardingBusinessInfo } from '@/features/onboarding/business-info'
import { OnboardingFinancialInfo } from '@/features/onboarding/financial-info'
import { OnboardingDocuments } from '@/features/onboarding/documents'
import { OnboardingVerification } from '@/features/onboarding/verification'
import { OnboardingComplete } from '@/features/onboarding/complete'

export const Route = createLazyFileRoute('/(auth)/onboarding/')({
  component: OnboardingPage,
})

type OnboardingStep = 'business' | 'financial' | 'documents' | 'verification' | 'complete'

function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('business')
  const [progress, setProgress] = useState(20)
  
  const [businessData, setBusinessData] = useState<any>(null)
  const [financialData, setFinancialData] = useState<any>(null)
  const [documentsData, setDocumentsData] = useState<any>(null)
  
  const handleBusinessComplete = (data: any) => {
    setBusinessData(data)
    setCurrentStep('financial')
    setProgress(40)
  }
  
  const handleFinancialComplete = (data: any) => {
    setFinancialData(data)
    setCurrentStep('documents')
    setProgress(60)
  }
  
  const handleDocumentsComplete = (data: any) => {
    setDocumentsData(data)
    setCurrentStep('verification')
    setProgress(80)
  }
  
  const handleVerificationComplete = () => {
    setCurrentStep('complete')
    setProgress(100)
  }
  
  const handleBackToBusinessInfo = () => {
    setCurrentStep('business')
    setProgress(20)
  }
  
  const handleBackToFinancialInfo = () => {
    setCurrentStep('financial')
    setProgress(40)
  }
  
  const handleBackToDocuments = () => {
    setCurrentStep('documents')
    setProgress(60)
  }
  
  const handleBackToVerification = () => {
    setCurrentStep('verification')
    setProgress(80)
  }
  
  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Principal Onboarding</CardTitle>
              <CardDescription>Complete your profile to get started with AxiTrust</CardDescription>
            </div>
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <Progress value={progress} className="h-2 w-full" />
        </CardHeader>
        
        <CardContent>
          <div className="mb-8">
            <Tabs value={currentStep} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                {['business', 'financial', 'documents', 'verification', 'complete'].map((step) => (
                  <TabsTrigger 
                    key={step}
                    value={step}
                    className="flex items-center gap-2"
                  >
                    {step === 'business' && <Building className="h-4 w-4" />}
                    {step === 'financial' && <CreditCard className="h-4 w-4" />}
                    {step === 'documents' && <FileCheck className="h-4 w-4" />}
                    {step === 'verification' && <Shield className="h-4 w-4" />}
                    {step === 'complete' && <CheckCircle2 className="h-4 w-4" />}
                    <span className="hidden sm:inline">{step.charAt(0).toUpperCase() + step.slice(1)}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {currentStep === 'business' && (
                <TabsContent value="business" className="mt-6">
                  <OnboardingBusinessInfo onComplete={handleBusinessComplete} />
                </TabsContent>
              )}
              
              {currentStep === 'financial' && (
                <TabsContent value="financial" className="mt-6">
                  <OnboardingFinancialInfo 
                    onComplete={handleFinancialComplete} 
                    onBack={handleBackToBusinessInfo} 
                  />
                </TabsContent>
              )}
              
              {currentStep === 'documents' && (
                <TabsContent value="documents" className="mt-6">
                  <OnboardingDocuments 
                    onComplete={handleDocumentsComplete} 
                    onBack={handleBackToFinancialInfo} 
                  />
                </TabsContent>
              )}
              
              {currentStep === 'verification' && (
                <TabsContent value="verification" className="mt-6">
                  <OnboardingVerification 
                    onComplete={handleVerificationComplete} 
                    onBack={handleBackToDocuments} 
                  />
                </TabsContent>
              )}
              
              {currentStep === 'complete' && (
                <TabsContent value="complete" className="mt-6">
                  <OnboardingComplete 
                    onBack={handleBackToVerification} 
                  />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t p-6">
          {currentStep !== 'business' && (
            <Button 
              variant="outline" 
              onClick={handleBackToBusinessInfo}
              disabled={currentStep === 'business'}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Business Info
            </Button>
          )}
          
          {currentStep !== 'verification' && currentStep !== 'complete' && (
            <Button onClick={() => setCurrentStep(currentStep === 'business' ? 'financial' : currentStep === 'financial' ? 'documents' : 'verification')}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          
          {currentStep === 'verification' && (
            <Button onClick={handleVerificationComplete}>
              Complete Verification
              <CheckCircle2 className="ml-2 h-4 w-4" />
            </Button>
          )}
          
          {currentStep === 'complete' && (
            <Button onClick={() => navigate({ to: '/' })}>
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
} 