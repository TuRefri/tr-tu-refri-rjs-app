import { useEffect, useState } from 'react'
import { getLocationByIDQuery } from '../functions/queries_graphql'
import { Location } from '../types/location'

export default function useGetLocation(id: string) {
    const [loadingGetLocation, setLoading] = useState(true)
    const [location, setLocation] = useState<Location | null>(null)
    const [error, setErrors] = useState<unknown>(null)

    useEffect(() =>{
        makeQuery()
    },[])

    const makeQuery = async () =>{
        try {
            setLoading(true)
            const response = await getLocationByIDQuery(id)
            if(response.status === 'SUCCESS'){
                //@ts-ignore
                setLocation(response.data.data.getLocation)
            }
        } catch (error) {
            setErrors(error)
            throw {
                error,
                msg: 'Error fetching in useGetLocation'
            }
        } finally{
            setTimeout(() => {
                setLoading(false)
                
            }, 2000);
        }
    }
  return { loadingGetLocation, location, error}
}
