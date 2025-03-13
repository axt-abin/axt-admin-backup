import Cookies from 'js-cookie'
import { create } from 'zustand'

const ACCESS_TOKEN = 'axitrust_auth_token'

// User types for AxiTrust
export type UserType = 'principal' | 'beneficiary' | 'insurer'

interface AuthUser {
  accountNo: string
  email: string
  role: string[]
  userType: UserType
  exp: number
  kycVerified?: boolean
  consentProvided?: boolean
}

interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    reset: () => void
    updateUserKycStatus: (status: boolean) => void
    updateUserConsentStatus: (status: boolean) => void
  }
}

export const useAuthStore = create<AuthState>()((set) => {
  const cookieState = Cookies.get(ACCESS_TOKEN)
  const initToken = cookieState ? JSON.parse(cookieState) : ''
  return {
    auth: {
      user: null,
      setUser: (user) =>
        set((state) => ({ ...state, auth: { ...state.auth, user } })),
      accessToken: initToken,
      setAccessToken: (accessToken) =>
        set((state) => {
          Cookies.set(ACCESS_TOKEN, JSON.stringify(accessToken))
          return { ...state, auth: { ...state.auth, accessToken } }
        }),
      resetAccessToken: () =>
        set((state) => {
          Cookies.remove(ACCESS_TOKEN)
          return { ...state, auth: { ...state.auth, accessToken: '' } }
        }),
      reset: () =>
        set((state) => {
          Cookies.remove(ACCESS_TOKEN)
          return {
            ...state,
            auth: { ...state.auth, user: null, accessToken: '' },
          }
        }),
      updateUserKycStatus: (status) =>
        set((state) => ({
          ...state,
          auth: {
            ...state.auth,
            user: state.auth.user
              ? { ...state.auth.user, kycVerified: status }
              : null,
          },
        })),
      updateUserConsentStatus: (status) =>
        set((state) => ({
          ...state,
          auth: {
            ...state.auth,
            user: state.auth.user
              ? { ...state.auth.user, consentProvided: status }
              : null,
          },
        })),
    },
  }
})

// export const useAuth = () => useAuthStore((state) => state.auth)
