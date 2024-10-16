import React from 'react'
interface MagnetRefriProps {
    id: number;
    image: string;
    name: string;
    category: string;
    phone: string;
}

export default function MagnetRefri({id, image, name, category, phone}: MagnetRefriProps) {
  return (
    <article className='relative h-full w-full flex flex-col items-center justify-center rounded-xl shadow-md px-2 bg-[#fdfcfc]'>
        <section className='w-full flex justify-center pb-1'>
            <div className='h-auto w-[60%] rounded-full overflow-hidden'>
                <img src={`images/logo/${image}`} alt={name} className='border aspect-square object-cover mix-blend-darken'/>
            </div>
        </section>
        <p className='font-light text-[10px] pt-1 text-center'>{category}</p>
        <div className='w-full border-b'/>
        <h1 className='text-xs font-semibold text-center p-1 text-nowrap'>{name}</h1>
        <p className='relative w-full rounded-full bg-green-600 text-white font-semibold text-[9px] mt-2 text-center py-[0.1rem] cursor-pointer'>
            <img src='/icons/social-media/whatsapp-icon.png' 
                height={10} 
                width={10} 
                className='absolute left-[0.3rem] top-1/2 transform -translate-y-1/2 '/>
            {phone}
        </p>
    </article>

  )
}

