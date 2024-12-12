import useGetS3Data from '../hooks/useGetS3Data'
import { useParams } from 'react-router-dom'
import useGetLocation from '../hooks/useGetLocation'
import PromotionCard from './PromotionCard'
import SimpleLoadingComponent from './SimpleLoadingComponent'
import useUserAuth from '../hooks/useUserAuth'
export default function LocationPage() {
    const params = useParams()
    const { awsS3Name, awsS3Region } = useGetS3Data()
    const { authenticated, loading } = useUserAuth()
    const { location, loadingGetLocation } = useGetLocation(params.id || '')
    console.log(location)
    if(!loading && !authenticated) return(
        <div className='h-full flex w-full pt-10 justify-center'>
            <div className='w-11/12 text-center'>
                <h1 className='text-gray-700 text-xl font-medium'>
                    ¡Hola! Por favor inicia sesión para acceder a la información del local.
                </h1>
            </div>
        </div>

    )
    if(loadingGetLocation) return <SimpleLoadingComponent loadingText='Consultando información' />
    return (
    <div
        className="overflow-y-scroll no-scrollbar py-12 px-4 z-30 cursor-pointer relative w-full h-full flex flex-col items-center rounded-2xl shadow-md bg-[#fdfcfc]"
    >
        <section className="w-full flex justify-center pb-1">
            <div className="h-auto w-[60%] rounded-full flex justify-center overflow-hidden">

                <img
                    src={`https://${awsS3Name}.s3.${awsS3Region}.amazonaws.com/${location?.store.avatarImage}`}
                    alt={location?.store.name}
                    className="border aspect-square object-cover mix-blend-darken"
                />
            </div>
        </section>
        <p className="font-light text-sm pt-1 text-center">
            {location?.store.categories.items[0].category.name}
        </p>
        <div className="w-full border-b" />
        <h1 className="text-2xl font-semibold text-center p-3 text-nowrap">
            {location?.store.name}
        </h1>
        <div className="w-full border-b" />
        <p className="text-sm font-light text-center p-1 text-wrap text-blue-500">
            {location?.address}
        </p>
        <div className="w-full border-b" />
        {/* <p className="text-sm text-center p-1 text-wrap font-medium">{objDays[day]}</p> */} 
        <div className="w-full border-b" />
        <p className="text-sm font-light p-1 h-fit w-5/6 break-words">
            {location?.store.description}
        </p>
        <div className="w-full border-b" />
        <p className="relative w-full rounded-full bg-green-600 text-white font-semibold text-lg mt-3 text-center py-2 cursor-pointer active:shadow-[inset_-1px_1px_5px_#16a34a,inset_1px_-1px_5px_#f9f9f9]  transition-transform duration-150">
            <img
                src="/icons/social-media/whatsapp-icon.webp"
                height={24}
                width={24}
                className="absolute left-[.9rem] top-1/2 transform -translate-y-1/2 "
            />
            {location?.phone}
        </p>
        <p className="relative w-full rounded-full bg-gray-300 font-semibold text-lg text-gray-700 m-2 text-center py-2 cursor-pointer active:shadow-[inset_-1px_1px_5px_#cccccc,inset_1px_-1px_5px_#f9f9f9]  transition-transform duration-150">
            {location?.phone}
        </p>
        {/* <p className="relative underline text-blue-500  flex  p-4 font-light text-sm">
            Compartir tienda con un amigo
            <img
                src="/icons/share.svg"
                height={15}
                width={15}
                className="absolute right-0 top-3"
            />
        </p> */}
        <div className="w-full border-b" />
        <h2 className="relative text-xl font-bold  py-4 px-8 m-2">
            Promociones
            <img
                src="/images/promotion.webp"
                height={30}
                width={30}
                className="absolute left-0 top-2"
            />
        </h2>
        <ul className='w-[95%] flex flex-col gap-y-2'>
            {location?.promotions.items.map((item) =>{
                return(
                    <li key={item.id}>
                        <PromotionCard data={item}/>
                    </li>
                )
            })}
        </ul>
        <div className="my-4 w-full " />
{/*                     {location && (
            <button
                onClick={() => handleDeleteMagnet(location?.id)}
                className="relative text-red-500 py-2 font-light text-sm active:underline"
            >
                Eliminar tienda de mi Refri
            </button>
        )} */}
    </div>
  )
}
