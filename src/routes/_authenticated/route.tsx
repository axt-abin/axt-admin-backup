import Cookies from 'js-cookie'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'
import { useAuthStore } from '@/stores/authStore'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) => {
    const { queryClient } = context
    return { queryClient }
  },
  loader: ({ location }) => {
    const { user } = useAuthStore.getState().auth
    
    // If user is not authenticated, redirect to sign-in
    if (!user) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      })
    }

    // If user is a principal and hasn't provided consent, redirect to consent page
    if (user.userType === 'principal' && !user.consentProvided) {
      throw redirect({
        to: '/consent',
      })
    }

    // If user is a principal and hasn't completed KYC, redirect to KYC page
    if (user.userType === 'principal' && !user.kycVerified) {
      throw redirect({
        to: '/kyc',
      })
    }

    return {}
  },
  component: RouteComponent,
})

function RouteComponent() {
  const sidebarCookie = Cookies.get('sidebar:state')
  const initialSidebarState = sidebarCookie ? JSON.parse(sidebarCookie) : true

  return (
    <div className={cn('flex min-h-screen flex-col')}>
      <SkipToMain />
      <SidebarProvider defaultOpen={initialSidebarState}>
        <SearchProvider>
          <div className='flex flex-1'>
            <AppSidebar />
            <main
              id='main'
              className='flex-1 bg-muted/40'
              tabIndex={-1}
              role='main'
            >
              <Outlet />
            </main>
          </div>
        </SearchProvider>
      </SidebarProvider>
    </div>
  )
}
