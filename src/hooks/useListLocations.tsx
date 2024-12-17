import { useEffect, useState } from 'react'
import { listLocationsByZoneQuery } from '../functions/queries_graphql'

export default function useListLocations(zone: string) {
    const [loading, setLoading] = useState(false)
    const [locations, setLocations] = useState<Location[]>([])
    const [error, setErrors] = useState<unknown>(null)

    useEffect(() => {
        makeQuery()
    }, [zone])

    const makeQuery = async () => {
        try {
            setLoading(true)
            const response = await listLocationsByZoneQuery(zone)
            if (response.status === 'SUCCESS' ) {
                //@ts-ignore
                const fetchedLocations: Location[] = response.data.data.listLocations.items
                
                const storedLocations = window.localStorage.getItem('locations_map')
                if (!storedLocations) {
                    window.localStorage.setItem('locations_map', JSON.stringify(fetchedLocations))
                    setLocations(fetchedLocations)
                } else {
                    const parsedLocations: Location[] = JSON.parse(storedLocations) as Location[]
                    setLocations(parsedLocations)
                }
            }
        } catch (error) {
            setErrors(error)
            throw {
                error,
                msg: 'Error fetching in useListLocations'
            }
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }
    }

    return { loading, locations, error }
}
