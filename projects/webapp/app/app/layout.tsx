'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { setToken } from '@/lib/store/auth-slice'
import Masthead from "@components/layout/masthead"
import { useGetUserQuery } from '@/lib/services/user'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { getToken, isSignedIn, isLoaded } = useAuth()
  const dispatch = useDispatch()
  const router = useRouter()
  const [isTokenFetched, setIsTokenFetched] = useState(false)

  const { data, error, isLoading, refetch } = useGetUserQuery();

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


  useEffect(() => {
    if (isTokenFetched && isSignedIn && !data) {
      refetch()
    }
  }, [isTokenFetched, isSignedIn, data, refetch])


  // Show a loader while Clerk is still determining authentication status
  if (!isLoaded) {
    return <div className='dashboard-layout'>Checking authentication...</div>
  }

  // Once Clerk is loaded, but the user isn't signed in, show access denied message
  if (!isSignedIn && isLoaded && !isLoading && !isTokenFetched && !data) {
    return (
      <div className='dashboard-layout ta-c flex flex-column gap-2 items-center'>
        <h1 className='heading-large'>Access Denied</h1>
        <p>You must be logged in to access this page.</p>
        <button className='btn-primary' onClick={() => router.push('/login')}>Go to Login</button>
      </div>
    )
  }

  if (!isTokenFetched || isLoading || !data) {
    return <div className='dashboard-layout'>Loading...</div>
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
    <>
      <Masthead user={data!}/>
      {children}
    </>
  )
}
