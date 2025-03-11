'use client'

import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/app')
    }
  }, [isLoaded, isSignedIn, router])

  // Show a loader while Clerk is still determining authentication status
  if (!isLoaded) {
    return <div className='auth-layout'>Loading authentication...</div>
  }

  return (
    <div className='auth-layout'>
      {children}
    </div>
  )
}
