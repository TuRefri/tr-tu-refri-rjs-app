import { useGlobalContext } from '../context/global-context';
import { useStorePageContext } from '../context/store-page-context';
import { MagnetRefriProps } from '../types'
import './StoreCard.css'
interface StoreCardProps {
    data: MagnetRefriProps; // Asegúrate de que MagnetRefriProps tenga la estructura correcta
  }
export default function StoreCard( { data }: StoreCardProps) {
    const { handleOpen } = useStorePageContext()
    const { handleAddMagnet } = useGlobalContext()
  return (
    <article className='shadow-sm cursor-pointer w-full rounded-lg border bg-gray-50' onClick={() => handleAddMagnet(data)/* handleOpen(data) */}>
        <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded-t-md  sm:w-96 dark:bg-gray-300">
            <svg className="w-10 h-10 text-gray-200 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
            </svg>
        </div>
        <div className='flex p-4  gap-x-4'>
            <section className='w-[20%] flex justify-center'>
                <div className='h-auto rounded-full overflow-hidden'>
                    <img src={`images/logo/${data.image}`} alt={data.name} className='border aspect-square object-cover mix-blend-darken'/>
                </div>
            </section>
            <section className='relative w-full'>
                <h1 className='font-medium text-md'>{data.name}</h1>
                <p className='font-light text-[10px] w-fit flex'>
                    {data.category}
                </p>
                <div className='absolute flex justify-center  items-center border p-[.1rem] border-gray-300 top-0 right-0 rounded-full'>
                    <div className=' bg-green-600 h-2 w-2 rounded-full animate-pulse' />
                </div>
            </section>
        </div>
    </article>
  )
}
