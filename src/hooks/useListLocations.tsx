import { useEffect, useState } from 'react'
import { listLocationsByZoneQuery } from '../functions/queries_graphql'

export default function useListLocations(zone: string) {
    const [loading, setLoading] = useState(false)
    const [locations, setLocations] = useState([])
    const [error, setErrors] = useState<unknown>(null)

    useEffect(() =>{
        makeQuery()
    },[])

    const makeQuery = async () =>{
        try {
            setLoading(true)
            const response = await listLocationsByZoneQuery(zone)
            if(response.status === 'SUCCESS'){
                //@ts-ignore
                setLocations(response.data.data.listLocations.items)
            }
        } catch (error) {
            setErrors(error)
            throw {
                error,
                msg: 'Error fetching in useListLocations'
            }
        } finally{
            setTimeout(() => {
                setLoading(false)
                
            }, 2000);
        }
    }
  return { loading, locations, error}
}
