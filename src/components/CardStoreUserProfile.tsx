/* Card de la tienda del usuario, se renderiza en el perfil del usuario */

import React from 'react'
import { MagnetRefriProps } from '../types'
interface CardStoreUserProfileProps {
    store: MagnetRefriProps,
    handleStoreDelete: (id: number) => void;
}
export default function CardStoreUserProfile({store, handleStoreDelete} : CardStoreUserProfileProps) {

    const deleteStore = (id: number) => {
        handleStoreDelete(id);
    };

  return (
    <article className='shadow-sm w-full rounded-lg border bg-gray-50 mb-2'>
    <div className='flex p-4  gap-x-4'>
        <section className='w-[20%] flex justify-center'>
            <div className='h-auto rounded-full overflow-hidden'>
                <img src={`images/logo/${store.image}`} alt={store.name} className='border aspect-square object-cover mix-blend-darken'/>
            </div>
        </section>
        <section className='relative w-full'>
            <h1 className='font-medium text-md'>{store.name}</h1>
            <p className='font-light text-[10px] w-fit flex'>
                {store.category}
            </p>
            <div className='absolute flex justify-center  items-center border p-[.1rem] border-gray-300 top-0 right-0 rounded-full'>
                <div className=' bg-green-600 h-2 w-2 rounded-full animate-pulse' />
            </div>
            <p 
                onClick={() =>deleteStore(store.id)}
                className='w-full text-end text-[10px] text-red-600 cursor-pointer'>Eliminar</p>
        </section>
    </div>
</article>
  )
}
