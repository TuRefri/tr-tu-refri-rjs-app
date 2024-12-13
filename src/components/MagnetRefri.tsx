import { MagnetsItem } from '../types/magnetGroup'
import { useDetailMagnetContext } from '../context/detail-magnet-context'
import useGetS3Data from '../hooks/useGetS3Data';
interface MagnetRefriProps1{
    item: MagnetsItem
}
export default function MagnetRefri({item}: MagnetRefriProps1) {
    const { handleOpen } = useDetailMagnetContext();
    const { awsS3Name, awsS3Region } = useGetS3Data()
  return (
    <article onClick={() => handleOpen(item)} className='cursor-pointer relative h-44    w-full flex flex-col items-center justify-center rounded-xl shadow-md px-2 bg-[#fdfcfc] active:shadow-[inset_-1px_1px_5px_#cccccc,inset_1px_-1px_5px_#f9f9f9]  transition-transform duration-150'>
        <section className='w-full flex justify-center pb-1'>
            <div className='h-auto w-[60%] rounded-full overflow-hidden'>
                <img 
                src={`https://${awsS3Name}.s3.${awsS3Region}.amazonaws.com/${item.location.store.avatarImage}`} alt={item.location.store.name} className='border aspect-square object-cover mix-blend-darken h-22'/>
            </div>
        </section>
        <p className='font-light text-[10px] pt-1 text-center'>{item.location.store.categories.items[0].category.name}</p>
        <div className='w-full border-b'/>
        <h1 className='text-xs font-semibold text-center p-1 text-nowrap'>{item.location.store.name}</h1>
        <p className='relative w-full rounded-full bg-green-600 text-white font-semibold text-[9px] mt-2 text-center py-[0.1rem] cursor-pointer'>
            <img src='/icons/social-media/whatsapp-icon.webp' 
                height={10} 
                width={10} 
                className='absolute left-[0.3rem] top-1/2 transform -translate-y-1/2 '/>
            {item.location.phone}
        </p>
    </article>

  )
}

