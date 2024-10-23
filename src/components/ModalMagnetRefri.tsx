import { useDetailMagnetContext } from '../context/detail-magnet-context'
import { motion } from 'framer-motion';
import close from '../../public/icons/close.svg'
type day = "lunes" | "martes" | "miércoles" | "jueves" | "viernes" | "sábado" | "domingo"
export default function ModalMagnetRefri() {
    const { handleClose, data } = useDetailMagnetContext();
    let dateObj = new Date();
    //@ts-ignore
    let day : day  = dateObj.toLocaleDateString('es-CO', { weekday: 'long' })
return (
    <motion.div
            key={data?.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: .2, ease:"easeOut" }} 
            className='overflow-y-scroll no-scrollbar  py-12 px-4 z-30 cursor-pointer relative w-[95%] h-full flex flex-col items-center rounded-2xl shadow-md bg-[#fdfcfc]  '
        >
        <button className="absolute top-4 right-4 rounded-[50px] h-8 w-8 p-1 flex justify-center items-center bg-white shadow-md active:shadow-[inset_-1px_1px_5px_#cccccc,inset_1px_-1px_5px_#f9f9f9]  transition-transform duration-150" onClick={handleClose}>
            <img src={close} alt='close' />
        </button>
        <section className='w-full flex justify-center pb-1'>
            <div className='h-auto w-[60%] rounded-full overflow-hidden'>
                <img src={`images/logo/${data?.image}`} alt={data?.name} className='border aspect-square object-cover mix-blend-darken'/>
            </div>
        </section>
        <p className='font-light text-sm pt-1 text-center'>{data?.category}</p>
        <div className='w-full border-b'/>
        <h1 className='text-2xl font-semibold text-center p-3 text-nowrap'>{data?.name}</h1>
        <div className='w-full border-b'/>
        <p className='text-sm font-light text-center p-1 text-wrap text-blue-500'>{data?.address}</p>
        <div className='w-full border-b'/>
        <p className='text-sm text-center p-1 text-wrap font-medium'>{data?.schedule[day]}</p>
        <div className='w-full border-b'/>
        <p className='text-sm font-light text-center p-1 text-wrap'>{data?.description}</p>
        <div className='w-full border-b'/>
        
        <p className='relative w-full rounded-full bg-green-600 text-white font-semibold text-lg mt-3 text-center py-2 cursor-pointer active:shadow-[inset_-1px_1px_5px_#16a34a,inset_1px_-1px_5px_#f9f9f9]  transition-transform duration-150'>
            <img src='/icons/social-media/whatsapp-icon.png' 
                height={24} 
                width={24} 
                className='absolute left-[.9rem] top-1/2 transform -translate-y-1/2 '/>
            {data?.phone}
        </p>
        <p className='relative w-full rounded-full bg-gray-300 font-semibold text-lg text-gray-700 m-2 text-center py-2 cursor-pointer active:shadow-[inset_-1px_1px_5px_#cccccc,inset_1px_-1px_5px_#f9f9f9]  transition-transform duration-150'>
            {data?.phone}
        </p>
        <p className='relative  underline text-blue-500  flex  p-4 font-light text-sm'>
            Compartir tienda con un amigo
            <img src='/icons/share.svg' 
                    height={15} 
                    width={15} 
                    className='absolute right-0 top-3'
                    />
        </p>
        <div className='w-full border-b'/>
        <h2 className='relative text-xl font-bold  py-4 px-8 m-2'>
            Promociones
            <img src='/images/promotion.png' 
                    height={30} 
                    width={30} 
                    className='absolute left-0 top-2'
                    />
        </h2>
        <div className='w-full border-b'/>

        <p className='relative text-red-500 py-2 font-light text-sm active:underline'>
            Eliminar tienda de mi Refri
        </p>

    </motion.div>
  )
}
