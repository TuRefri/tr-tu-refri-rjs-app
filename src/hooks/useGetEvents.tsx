import { useEffect, useState } from 'react'
import { listEventsQuery } from '../functions/queries_graphql'
import { Event } from '../types'
/* import { UserData } from '../types' */
export default function useGetEvents(zoneID: string) {
    const [loadingEvents, setLoadingEvents] = useState(true)
    const [events, setEvents] = useState<Event[]>([])
    const [error, setErrors] = useState<unknown>(null)

    useEffect(() =>{
        makeQuery(zoneID)
    },[])

    const makeQuery = async (userID : string) =>{
        try {
            setLoadingEvents(true)
            const response = await listEventsQuery(userID)
            if(response.status === 'SUCCESS'){
                //@ts-ignore
                setEvents(response.data.data.listEvents.items)
            }
        } catch (error) {
            setErrors(error)
            throw {
                error,
                msg: 'Error fetching in useGetMagnets'
            }
        } finally{
            setLoadingEvents(false)
        }
    }
    const refetch = (zoneID: string) => {
        makeQuery(zoneID)
    }
  return { loadingEvents, events, error , refetch }
}
