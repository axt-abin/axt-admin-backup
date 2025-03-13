import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { NavGroup } from '@/components/layout/nav-group'
import { NavUser } from '@/components/layout/nav-user'
import { TeamSwitcher } from '@/components/layout/team-switcher'
import { sidebarData } from './data/sidebar-data'
import { useAuthStore } from '@/stores/authStore'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore((state) => state.auth)
  const userType = user?.userType || 'principal'

  // Filter navigation groups based on user type
  const filteredNavGroups = sidebarData.navGroups.filter(group => {
    // Always show General and Settings groups
    if (group.title === 'General' || group.title === 'Settings') {
      return true
    }
    
    // Show only user type specific groups
    if (userType === 'principal' && group.title === 'Principal') {
      return true
    }
    
    if (userType === 'beneficiary' && group.title === 'Beneficiary') {
      return true
    }
    
    if (userType === 'insurer' && group.title === 'Insurer') {
      return true
    }
    
    return false
  })

  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        {filteredNavGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          ...sidebarData.user,
          name: user?.email?.split('@')[0] || 'User',
          email: user?.email || 'user@example.com',
        }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
