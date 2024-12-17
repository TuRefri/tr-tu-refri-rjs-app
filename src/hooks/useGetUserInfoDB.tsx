import { useEffect, useState } from 'react'
import { getUserQuery } from '../functions/queries_graphql'
import { getCurrentUser } from 'aws-amplify/auth'
import { UserData } from '../types'
export default function useUserInfoDB() {
    const [loadingUserData, setLoadingUserData] = useState(true)
    const [user, setUser] = useState<UserData | null>(null)
    const [error, setErrors] = useState<unknown>(null)

    useEffect(() =>{
        getCurrentUser()
        .then(data =>{
            if(data.userId){
                makeQuery(data.userId)
            }
        })
        .catch(() => console.error('user not logged'))
    },[])

    const makeQuery = async (userID : string) =>{
        try {
            setLoadingUserData(true)
            const response = await getUserQuery(userID)
            if(response.status === 'SUCCESS'){
                //@ts-ignore
                setUser(response.data.data.getUser)
            }
        } catch (error) {
            setErrors(error)
            throw {
                error,
                msg: 'Error fetching in userUserInfoDB'
            }
        } finally{
            setLoadingUserData(false)
        }
    }
    const refetch = () => {
        getCurrentUser()
        .then(data =>{
            if(data.userId){
                makeQuery(data.userId)
            }
        })
        .catch(() => console.error('user not logged'))
    }
  return { loadingUserData, user, error , refetch }
}
