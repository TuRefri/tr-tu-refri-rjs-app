import { useEffect, useState } from 'react'
import { listBannersQuery } from '../functions/queries_graphql'
import useGetS3Data from './useGetS3Data'
interface BannerItem {
    image: string;
    name: string;
    id: string;
    alt: string;
    url: string
}
export default function useListBanners() {
    const [loading, setLoading] = useState(false)
    const [banners, setBanners] = useState<BannerItem[]>([])
    const [error, setErrors] = useState<unknown>(null)
    const {awsS3Name, awsS3Region} = useGetS3Data()

    useEffect(() =>{
        makeQuery()
    },[])

    const makeQuery = async () =>{
        try {
            setLoading(true)
            const response = await listBannersQuery()
            if(response.status === 'SUCCESS'){
                //@ts-ignore
                response.data.map(item =>{
                    item.url = `https://${awsS3Name}.s3.${awsS3Region}.amazonaws.com/${item.image}`
                    item.alt = item.name
                })
                setBanners(response.data)
                //@ts-ignore
            }
        } catch (error) {
            setErrors(error)
            throw {
                error,
                msg: 'Error fetching in useListBanners'
            }
        } finally{
            setLoading(false)
        }
    }
  return { loading, banners, error}
}
