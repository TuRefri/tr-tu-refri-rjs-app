import { getCurrentUser } from 'aws-amplify/auth'
import { useEffect, useState } from 'react'

export default function useUserAuth() {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUserAuth()
  }, [])

  const checkUserAuth = async () => {
    try {
      await getCurrentUser()
      setAuthenticated(true)
    } catch (error) {
      setAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  return { authenticated, loading }
}
