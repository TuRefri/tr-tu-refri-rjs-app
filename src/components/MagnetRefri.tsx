import { MagnetRefriProps } from '../types'
import { useDetailMagnetContext } from '../context/detail-magnet-context'
interface MagnetRefriProps1{
    item: MagnetRefriProps
}
export default function MagnetRefri({item}: MagnetRefriProps1) {
    const { handleOpen} = useDetailMagnetContext();

  return (
    <article onClick={() => handleOpen(item)} className='cursor-pointer relative h-44    w-full flex flex-col items-center justify-center rounded-xl shadow-md px-2 bg-[#fdfcfc] active:shadow-[inset_-1px_1px_5px_#cccccc,inset_1px_-1px_5px_#f9f9f9]  transition-transform duration-150'>
        <section className='w-full flex justify-center pb-1'>
            <div className='h-auto w-[60%] rounded-full overflow-hidden'>
                <img src={`images/logo/${item.image}`} alt={item.name} className='border aspect-square object-cover mix-blend-darken'/>
            </div>
        </section>
        <p className='font-light text-[10px] pt-1 text-center'>{item.category}</p>
        <div className='w-full border-b'/>
        <h1 className='text-xs font-semibold text-center p-1 text-nowrap'>{item.name}</h1>
        <p className='relative w-full rounded-full bg-green-600 text-white font-semibold text-[9px] mt-2 text-center py-[0.1rem] cursor-pointer'>
            <img src='/icons/social-media/whatsapp-icon.png' 
                height={10} 
                width={10} 
                className='absolute left-[0.3rem] top-1/2 transform -translate-y-1/2 '/>
            {item.phone}
        </p>
    </article>

  )
}

