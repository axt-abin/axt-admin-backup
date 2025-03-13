import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Progress } from '@/components/ui/progress'
import { OnboardingBusinessInfo } from '@/features/onboarding/business-info'
import { OnboardingFinancialInfo } from '@/features/onboarding/financial-info'
import { OnboardingDocuments } from '@/features/onboarding/documents'
import { OnboardingVerification } from '@/features/onboarding/verification'
import { OnboardingComplete } from '@/features/onboarding/complete'

export const Route = createFileRoute('/(auth)/onboarding/')({
  component: OnboardingPage,
})

type OnboardingStep = 'business' | 'financial' | 'documents' | 'verification' | 'complete'

function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('business')
  const [progress, setProgress] = useState(20)
  
  const handleBusinessComplete = (data: any) => {
    console.log('Business data:', data)
    setCurrentStep('financial')
    setProgress(40)
  }
  
  const handleFinancialComplete = (data: any) => {
    console.log('Financial data:', data)
    setCurrentStep('documents')
    setProgress(60)
  }
  
  const handleDocumentsComplete = (data: any) => {
    console.log('Documents data:', data)
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
    <div className="container max-w-3xl py-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Business Onboarding</h1>
        <p className="text-muted-foreground">
          Complete the following steps to verify your business and get started with AxiTrust.
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>
      
      {currentStep === 'business' && (
        <OnboardingBusinessInfo onComplete={handleBusinessComplete} />
      )}
      
      {currentStep === 'financial' && (
        <OnboardingFinancialInfo 
          onComplete={handleFinancialComplete} 
          onBack={handleBackToBusinessInfo} 
        />
      )}
      
      {currentStep === 'documents' && (
        <OnboardingDocuments 
          onComplete={handleDocumentsComplete} 
          onBack={handleBackToFinancialInfo} 
        />
      )}
      
      {currentStep === 'verification' && (
        <OnboardingVerification 
          onComplete={handleVerificationComplete} 
          onBack={handleBackToDocuments} 
        />
      )}
      
      {currentStep === 'complete' && (
        <OnboardingComplete 
          onBack={handleBackToVerification} 
        />
      )}
    </div>
  )
} 