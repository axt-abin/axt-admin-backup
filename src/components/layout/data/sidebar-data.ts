import {
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconChecklist,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
  IconUsers,
  IconFileDescription,
  IconCertificate,
  IconClipboardCheck,
  IconReportAnalytics,
  IconBuildingBank,
  IconCoin,
  IconFileInvoice,
  IconShieldCheck,
  IconAlertCircle,
  IconUserCircle,
} from '@tabler/icons-react'
import { Building, Command, Shield } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/avatars/user.jpg',
  },
  teams: [
    {
      name: 'AxiTrust',
      logo: Shield,
      plan: 'Surety Bond Management',
    },
  ],
  navGroups: [
    {
      title: 'Principal',
      items: [
        {
          title: 'Bond Applications',
          url: '/principal/applications',
          icon: IconFileDescription,
        },
        {
          title: 'My Bonds',
          url: '/principal/bonds',
          icon: IconCertificate,
        },
        {
          title: 'Document Upload',
          url: '/principal/documents',
          icon: IconClipboardCheck,
        },
        {
          title: 'Renewal Requests',
          url: '/principal/renewals',
          icon: IconReportAnalytics,
        },
        {
          title: 'Claims Tracking',
          url: '/principal/claims',
          icon: IconAlertCircle,
        },
      ],
    },
    {
      title: 'Beneficiary',
      items: [
        {
          title: 'Bond Listings',
          url: '/beneficiary/bonds',
          icon: IconCertificate,
        },
        {
          title: 'Submit Claim',
          url: '/beneficiary/submit-claim',
          icon: IconFileInvoice,
        },
        {
          title: 'Claim Tracking',
          url: '/beneficiary/claims',
          icon: IconAlertCircle,
        },
        {
          title: 'Communication',
          url: '/beneficiary/messages',
          icon: IconMessages,
        },
      ],
    },
    {
      title: 'Insurer',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Underwriting',
          url: '/insurer/underwriting',
          icon: IconBuildingBank,
        },
        {
          title: 'Bond Approval',
          url: '/insurer/approvals',
          icon: IconShieldCheck,
        },
        {
          title: 'Claims Processing',
          url: '/insurer/claims',
          icon: IconFileInvoice,
        },
        {
          title: 'Risk Analytics',
          url: '/insurer/analytics',
          icon: IconReportAnalytics,
        },
        {
          title: 'Premium Management',
          url: '/insurer/premiums',
          icon: IconCoin,
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          title: 'Account Settings',
          url: '/settings',
          icon: IconSettings,
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
}
