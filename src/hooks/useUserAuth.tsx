import { getCurrentUser } from 'aws-amplify/auth'
import { useEffect, useState } from 'react'

export default function useUserAuth() {
    const [ authenticated, setAuthenticated] = useState(false)
    useEffect(() =>{
        getCurrentUser()
        .then(() => setAuthenticated(true))
        .catch(() => setAuthenticated(false))
    })
  return { authenticated }
}
