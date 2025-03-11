'use client'

import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'
import Loader from '@components/feedback/loader'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/')
    }
  }, [isLoaded, isSignedIn, router])

  // Show a loader while Clerk is still determining authentication status
  if (!isLoaded) {
    return (
      <div className='auth-layout'>
        <Loader helpText="Checking authentication status..." />
      </div>
    )
  }

  return (
    <div className='auth-layout'>
      {children}
    </div>
  )
}
