import { useEffect, useState } from 'react'
import { listMagnetGroupsQuery } from '../functions/queries_graphql'
import { getCurrentUser } from 'aws-amplify/auth'
import { MagnetGroup } from '../types/magnetGroup'
/* import { UserData } from '../types' */
export default function useGetMagnets() {
    const [loadingMagnets, setLoadingMagnets] = useState(true)
    const [magnetgroups, setMagnetGroups] = useState<MagnetGroup[]>([])
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
            setLoadingMagnets(true)
            const response = await listMagnetGroupsQuery(userID)
            if(response.status === 'SUCCESS'){
                //@ts-ignore
                setMagnetGroups(response.data.data.listMagnetGroups.items)
            }
        } catch (error) {
            setErrors(error)
            throw {
                error,
                msg: 'Error fetching in useGetMagnets'
            }
        } finally{
            setLoadingMagnets(false)
        }
    }
    const refetch = () => {
        getCurrentUser()
        .then(data =>{
            if(data.userId){
                makeQuery(data.userId)
            }
        })
        .catch(() => console.error('fail getting magnetgroups'))
    }
  return { loadingMagnets, magnetgroups, error , refetch }
}
