import React from 'react'
import { MagnetRefriProps } from '../types'
import { motion } from 'framer-motion'
import { useGlobalContext } from '../context/global-context'
interface ModalMapProps {
    data: MagnetRefriProps | null
    handleCloseModal: () => void
}
export default function ModalMap({data, handleCloseModal} : ModalMapProps) {
  const { handleAddMagnet } = useGlobalContext()
  return (
    <motion.div
      initial={{scale: 1, y: 400}}
      animate={{scale: 1, y: 0}}
      transition={{duration: .3, ease:'easeOut'}}
      className='w-full rounded-t-3xl  bg-white text-gray-700 min-h-40 px-8 py-8'
    >
      <div className='w-full flex gap-x-4 pb-4'>
      <button className="absolute top-4 right-4 rounded-[50px] h-8 w-8 p-1 flex justify-center items-center bg-white shadow-md active:shadow-[inset_-1px_1px_5px_#cccccc,inset_1px_-1px_5px_#f9f9f9]  transition-transform duration-150" onClick={() => handleCloseModal()}>
            <img src={'/icons/close.svg'} alt='close' />
        </button>
            <section className='w-[20%] flex justify-center'>
                <div className='h-auto rounded-full overflow-hidden'>
                    <img src={`images/logo/${data?.image}`} alt={data?.name} className='border aspect-square object-cover mix-blend-darken'/>
                </div>
            </section>
            <section className='relative w-full'>
                <h1 className='font-medium text-lg'>{data?.name}</h1>
                <p className='font-light text-xs w-fit flex'>
                    {data?.category}
                </p>
            </section>
        </div>
        <button 
          onClick={() =>handleAddMagnet(data)}
          className='w-full border py-2 text-sm rounded-md bg-blue-500 text-white font-medium active:bg-blue-600'
          >Agregar a tu refri</button>
    </motion.div>
  )
}
