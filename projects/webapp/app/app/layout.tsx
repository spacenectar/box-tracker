'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { setToken } from '@/lib/store/auth-slice'
import Masthead from "@components/masthead"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { getToken, isSignedIn, isLoaded } = useAuth()
  const dispatch = useDispatch()
  const router = useRouter()
  const [isTokenFetched, setIsTokenFetched] = useState(false)

  useEffect(() => {
    async function fetchToken() {
      if (!isSignedIn) return // Don't try to get the token if not signed in
      const token = await getToken()
      if (token) {
        dispatch(setToken(token))
      }
      setIsTokenFetched(true)
    }
    fetchToken()
  }, [getToken, dispatch, isSignedIn])

  // Show a loader while Clerk is still determining authentication status
  if (!isLoaded) {
    return <div className='dashboard-layout'>Checking authentication...</div>
  }

  // Once Clerk is loaded, but the user isn't signed in, show access denied message
  if (!isSignedIn) {
    return (
      <div className='dashboard-layout'>
        <h2>Access Denied</h2>
        <p>You must be logged in to access this page.</p>
        <button onClick={() => router.push('/login')}>Go to Login</button>
      </div>
    )
  }

  if (!isTokenFetched) {
    return <div className='dashboard-layout'>Loading...</div>
  }

  return (
    <>
      <Masthead />
      {children}
    </>
  )
}
