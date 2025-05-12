'use client'

import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'
import Masthead from "@components/layout/masthead"
import { useGetUserQuery } from '@/lib/services/user'
import Footer from '@components/layout/footer'
import Loader from '@components/feedback/loader'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()

  // Conditionally fetch user data: Skip if Clerk isn't loaded or user isn't signed in
  const { data: userData, error, isLoading: isUserLoading } = useGetUserQuery(undefined, {
    skip: !isLoaded || !isSignedIn,
  });

  // Handle redirect to login page if Clerk is loaded and user is not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/login');
    }
  }, [isLoaded, isSignedIn, router])

  // Show loader while Clerk is loading
  if (!isLoaded) {
    return <div className='dashboard-layout'><Loader helpText="Checking authentication status..." /></div>
  }

  // If Clerk is loaded, but user is not signed in (and redirect hasn't happened yet)
  // or if the user query is loading, show a loader.
  if (!isSignedIn || isUserLoading) {
     // Only show loading for user data *after* clerk is loaded and user is signed in
     if (isSignedIn && isUserLoading) {
        return (
          <div className='dashboard-layout'>
            <Loader helpText="Loading user data..." />
          </div>
        )
     }
     // Otherwise, Clerk is likely handling the redirect or the user is signed out
     // You might want a generic loading or null render here while redirect happens
     return <div className='dashboard-layout'><Loader helpText="Loading..." /></div> // Or null
  }

  // Handle error fetching user data after authentication is confirmed
  if (error) {
    console.error("Error fetching user:", error); // Log the error for debugging
    return <div className='dashboard-layout ta-c flex flex-column gap-2 items-center'>
      <h1 className='heading-large'>Error</h1>
      <p>There was an error fetching your user data.</p>
      {/* Consider offering sign-out or just refresh */}
      <button className='btn-primary' onClick={() => window.location.reload()}>Try Again</button>
      <p>
        If the problem persists, please try again later.
      </p>
    </div>
  }

  // If we reach here: Clerk is loaded, user is signed in, and user data query is finished without error.
  // We should have userData.
  if (!userData) {
     // This case might indicate an unexpected issue if error is not set.
     console.error("User data is missing after successful load.");
     return <div className='dashboard-layout'><Loader helpText="Preparing dashboard..." /></div>
  }

  return (
    <div className='app-layout'>
      <Masthead user={userData}/>
      {children}
      <Footer />
    </div>
  )
}
