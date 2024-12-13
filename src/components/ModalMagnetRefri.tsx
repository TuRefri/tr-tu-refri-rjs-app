import { useDetailMagnetContext } from '../context/detail-magnet-context'
import { AnimatePresence, motion } from 'framer-motion';
import { day, /* Promotion */ } from '../types';
import PromotionCard from './PromotionCard';
import useGetS3Data from '../hooks/useGetS3Data';
import { Schedule } from '../types/magnetGroup';
import { handleContactViaWhatsapp, handleShareLocation } from '../utils/shareInfoFunctions';
interface ModalMagnetRefriProps {
    handleDeleteMagnet: (id : string) => void
}
export default function ModalMagnetRefri({ handleDeleteMagnet }: ModalMagnetRefriProps) {
    const { handleClose, data } = useDetailMagnetContext();
    const { awsS3Name, awsS3Region } = useGetS3Data();


    let dateObj = new Date();
    //@ts-ignore
    let day: day = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const objDays : any = {}
    const formatSchedule = (schedules : Schedule[]) => {
        schedules
            .map((schedule) => {
                const { day, openingTime, closingTime } = schedule;
                objDays[`${day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()}`] = `${openingTime} - ${closingTime}`
            })
    };

    const formattedSchedule = data?.location.schedules.items
        ? formatSchedule(data.location.schedules.items)
        : 'Horarios no disponibles';
    console.log(formattedSchedule)

    
    return (
        <>
            <AnimatePresence>
                <motion.div
                    key="modal-magnet"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                        scale: 0,
                        transition: { duration: 1, ease: 'linear' },
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="overflow-y-scroll no-scrollbar py-12 px-4 z-30 cursor-pointer relative w-[95%] h-full flex flex-col items-center rounded-2xl shadow-md bg-[#fdfcfc]"
                >
                    <button
                        className="absolute top-4 right-4 rounded-[50px] h-8 w-8 p-1 flex justify-center items-center bg-white shadow-md active:shadow-[inset_-1px_1px_5px_#cccccc,inset_1px_-1px_5px_#f9f9f9]  transition-transform duration-150"
                        onClick={handleClose}
                    >
                        <img src={'/icons/close.svg'} alt="close" />
                    </button>
                    <section className="w-full flex justify-center pb-1">
                        <div className="h-auto w-[60%] rounded-full flex justify-center overflow-hidden">
                            <img
                                src={`https://${awsS3Name}.s3.${awsS3Region}.amazonaws.com/${data?.location.store.avatarImage}`}
                                alt={data?.location.store.name}
                                className="border aspect-square object-cover mix-blend-darken"
                            />
                        </div>
                    </section>
                    <p className="font-light text-sm pt-1 text-center">
                        {data?.location.store.categories.items[0].category.name}
                    </p>
                    <div className="w-full border-b" />
                    <h1 className="text-2xl font-semibold text-center p-3 text-nowrap">
                        {data?.location.store.name}
                    </h1>
                    <div className="w-full border-b" />
                    <p className="text-sm font-light text-center p-1 text-wrap text-blue-500">
                        {data?.location.address}
                    </p>
                    <div className="w-full border-b" />
                    <p className="text-sm text-center p-1 text-wrap font-medium">{objDays[day]}</p> 
                    <div className="w-full border-b" />
                    <p className="text-sm font-light p-1 h-fit w-5/6 break-words">
                        {data?.location.store.description}
                    </p>
                    <div className="w-full border-b" />
                    <button
                    onClick={() => handleContactViaWhatsapp(data?.location.phone || '')}
                    className="relative w-full rounded-full bg-green-600 text-white font-semibold text-lg mt-3 text-center py-2 cursor-pointer active:shadow-[inset_-1px_1px_5px_#16a34a,inset_1px_-1px_5px_#f9f9f9] transition-transform duration-150"
                    >
                    <img
                        src="/icons/social-media/whatsapp-icon.webp"
                        height={24}
                        width={24}
                        className="absolute left-[.9rem] top-1/2 transform -translate-y-1/2"
                    />
                    {data?.location.phone}
                    </button>

                    <button onClick={() => window.location.href=`tel:${data?.location.phone}`}className="relative w-full rounded-full bg-gray-300 font-semibold text-lg text-gray-700 m-2 text-center py-2 cursor-pointer active:shadow-[inset_-1px_1px_5px_#cccccc,inset_1px_-1px_5px_#f9f9f9]  transition-transform duration-150">
                        {data?.location.phone}
                    </button>
                    <button 
                        onClick={() => handleShareLocation(data)}
                        className="relative underline text-blue-500  flex  p-4 font-light text-sm">
                        Compartir tienda con un amigo
                        <img
                            src="/icons/share.svg"
                            height={15}
                            width={15}
                            className="absolute right-0 top-3"
                        />
                    </button>
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
                        {data?.location.promotions.items.map((item) =>{
                            return(
                                <li key={item.id}>
                                    <PromotionCard data={item}/>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="my-4 w-full border-b" />
                    {data && (
                        <button
                            onClick={() => handleDeleteMagnet(data?.id)}
                            className="relative text-red-500 py-2 font-light text-sm active:underline"
                        >
                            Eliminar tienda de mi Refri
                        </button>
                    )}
                </motion.div>
            </AnimatePresence>
        </>
    );
}