import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { SignUpForm } from './components/sign-up-form'
import { UserType } from '@/stores/authStore'
import { Badge } from '@/components/ui/badge'

interface SignUpProps {
  defaultUserType?: UserType;
}

// Helper function to get a formatted role name
const getRoleName = (userType?: UserType) => {
  if (!userType) return '';
  
  switch(userType) {
    case 'principal':
      return 'Principal';
    case 'beneficiary':
      return 'Beneficiary';
    case 'insurer':
      return 'Insurer';
    default:
      return '';
  }
}

// Helper function to get badge color based on role
const getRoleBadgeColor = (userType?: UserType) => {
  if (!userType) return '';
  
  switch(userType) {
    case 'principal':
      return 'bg-blue-100 text-blue-800';
    case 'beneficiary':
      return 'bg-green-100 text-green-800';
    case 'insurer':
      return 'bg-purple-100 text-purple-800';
    default:
      return '';
  }
}

export default function SignUp({ defaultUserType }: SignUpProps = {}) {
  return (
    <AuthLayout>
      <div className="relative">
        {defaultUserType && (
          <div className="absolute top-2 right-2">
            <Badge className={getRoleBadgeColor(defaultUserType)}>
              {getRoleName(defaultUserType)}
            </Badge>
          </div>
        )}
        <Card className='p-6'>
          <div className='mb-2 flex flex-col space-y-2 text-left'>
            <h1 className='text-lg font-semibold tracking-tight'>
              Create an account
            </h1>
            <p className='text-sm text-muted-foreground'>
              Enter your email and password to create an account. <br />
              Already have an account?{' '}
              <Link
                to={defaultUserType ? `/${defaultUserType}-sign-in` : '/sign-in'}
                className='underline underline-offset-4 hover:text-primary'
              >
                Sign In
              </Link>
            </p>
          </div>
          <SignUpForm defaultUserType={defaultUserType} />
          <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
            By creating an account, you agree to our{' '}
            <a
              href='/terms'
              className='underline underline-offset-4 hover:text-primary'
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href='/privacy'
              className='underline underline-offset-4 hover:text-primary'
            >
              Privacy Policy
            </a>
            .
          </p>
        </Card>
      </div>
    </AuthLayout>
  )
}
