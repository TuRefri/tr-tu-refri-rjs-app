import { useEffect, useState } from 'react'
import { listCategoriesQuery } from '../functions/queries_graphql'
import { CategoryQuery } from '../types/graphql'

export default function useListCategories() {
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<CategoryQuery[]>([])
    const [error, setErrors] = useState<unknown>(null)

    useEffect(() => {
        const storedCategories = window.localStorage.getItem('categories');
        if (storedCategories && storedCategories !== '[]') {
            setCategories(JSON.parse(storedCategories));
        }else{
            makeQuery();
        }
    }, []);

    const makeQuery = async () =>{
        try {
            setLoading(true)
            const response = await listCategoriesQuery()
            if(response.status === 'SUCCESS'){
                //@ts-ignore
                setCategories(response.data.data.listCategories.items)
                //@ts-ignore
                window.localStorage.setItem('categories', JSON.stringify(response.data.data.listCategories.items))
            }
        } catch (error) {
            setErrors(error)
            throw {
                error,
                msg: 'Error fetching in useListCategories'
            }
        } finally{
            setLoading(false)
        }
    }
  return { loading, categories, error}
}
