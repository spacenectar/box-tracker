'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useDispatch } from 'react-redux'
import { setToken } from '@/lib/store/auth-slice'
import Masthead from "@components/masthead"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth()
  const dispatch = useDispatch()
  const [isTokenFetched, setIsTokenFetched] = useState(false)

  useEffect(() => {
    async function fetchToken() {
      const token = await getToken()
      if (token) {
        dispatch(setToken(token))
      }
      setIsTokenFetched(true)
    }
    fetchToken()
  }, [getToken, dispatch])

  if (!isTokenFetched) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Masthead />
      {children}
    </>
  )
}
