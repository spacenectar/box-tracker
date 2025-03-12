'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { setToken } from '@/lib/store/auth-slice'
import Masthead from "@components/layout/masthead"
import { useGetUserQuery } from '@/lib/services/user'
import Footer from '@components/layout/footer'
import Loader from '@components/feedback/loader'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { getToken, isSignedIn, isLoaded } = useAuth()
  const dispatch = useDispatch()
  const router = useRouter()
  const [isTokenFetched, setIsTokenFetched] = useState(false)
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null)

  const { data, error, isLoading, refetch } = useGetUserQuery();

  const fetchAndSetToken = useCallback(async () => {
    if (!isSignedIn) return false
    try {
      // Get a fresh token without any options
      const token = await getToken()
      if (token) {
        dispatch(setToken(token))
        return true
      }
    } catch (error) {
      console.error('Error fetching token:', error)
    }
    return false
  }, [getToken, dispatch, isSignedIn])

  // Initial token fetch
  useEffect(() => {
    async function initialFetchToken() {
      if (await fetchAndSetToken()) {
        setIsTokenFetched(true)
      }
    }
    initialFetchToken()
  }, [fetchAndSetToken])

  // Set up token refresh mechanism
  useEffect(() => {
    if (!isSignedIn) return

    // Refresh token every 15 minutes to prevent expiration
    const setupRefreshTimer = () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current)
      }
      
      refreshTimerRef.current = setInterval(async () => {
        await fetchAndSetToken()
      }, 15 * 60 * 1000) // 15 minutes
    }

    setupRefreshTimer()

    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current)
        refreshTimerRef.current = null
      }
    }
  }, [isSignedIn, fetchAndSetToken])


  useEffect(() => {
    if (isTokenFetched && isSignedIn && !data) {
      refetch()
    }
  }, [isTokenFetched, isSignedIn, data, refetch])


  // Show a loader while Clerk is still determining authentication status
  if (!isLoaded) {
    return <div className='dashboard-layout'><Loader helpText="Checking authentication status..." /></div>
  }

  // Once Clerk is loaded, but the user isn't signed in, show access denied message
  if (!isSignedIn && isLoaded) {
    return (
      <div className='dashboard-layout ta-c flex flex-column gap-2 items-center'>
        <h1 className='heading-large'>Access Denied</h1>
        <p>You must be logged in to access this page.</p>
        <button className='btn-primary' onClick={() => router.push('/login')}>Go to Login</button>
      </div>
    )
  }

  // Show loading indicator only if we're still fetching data
  if (isSignedIn && (!isTokenFetched || isLoading || !data)) {
    return (
      <div className='dashboard-layout'>
        <Loader helpText="Loading user data..." />
      </div>
    )
  }

  if (error && !isLoaded) {
    return <div className='dashboard-layout ta-c flex flex-column gap-2 items-center'>
      <h1 className='heading-large'>Error</h1>
      <p>There was an error fetching your user data.</p>
      <button className='btn-primary' onClick={() => router.refresh()}>Try Again</button>
      <p>
        If the problem persists, please try again later.
      </p>
    </div>
  }

  return (
    <div className='app-layout'>
      <Masthead user={data!}/>
      {children}
      <Footer />
    </div>
  )
}
