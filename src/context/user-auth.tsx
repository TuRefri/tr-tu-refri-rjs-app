import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react'
// Amplify package
import { Hub } from 'aws-amplify/utils'
import { getCurrentUser } from 'aws-amplify/auth'
import { checkUserFridgeColor } from '../utils/checkUserFridgeColor'
import { useFridgeContext } from './fridge-color-context'

// Define types
interface UserContextType {
  user: any | null
  setUser: React.Dispatch<React.SetStateAction<any | null>>
}

interface UserContextProviderProps {
  children: ReactNode
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserContextProvider: React.FC<UserContextProviderProps> = (props) => {
  const [user, setUser] = useState<any | null>(null)
  const { setCurrentColor } = useFridgeContext()
  // Listening to auth events
  useEffect(() => {
    const hubListener = Hub.listen('auth', ({ payload: { event } }) => {
      switch (event) {
        case 'signedIn':
          checkUser()
          break
        case 'signedOut':
          setUser(null)
          break
        default:
          break
      }
    })

    checkUser()

    return () => {
      // Cleanup the listener when the component unmounts
      hubListener()
    }
  }, [])

  const checkUser = async () => {
    try {
      const responseUser = await getCurrentUser()
      fridgeColor(responseUser.userId)
      setUser(responseUser)
    } catch (error) {
      setUser(null)
    }
  }
  const fridgeColor = (id : string) => {
    console.log(`${id}_fridgecolor`)
    if(window.localStorage.getItem(`${id}_fridgecolor`)){
      const fridgeColor = checkUserFridgeColor(JSON.parse(window.localStorage.getItem(`${id}_fridgecolor`) || "{}"));
      console.log(fridgeColor)
      if(fridgeColor){
        setCurrentColor(fridgeColor)
      }
    }
  }
  return (
    <>
        <UserContext.Provider value={{ user, setUser }}>
          {props.children}
        </UserContext.Provider>
    </>
  )
}

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider')
  }
  return context
}