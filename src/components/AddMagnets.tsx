import React from 'react'
import add from '../../public/icons/add-icon.svg'
export default function AddMagnets() {
  return (
    <button onClick={() => {console.log('hola')}} className='w-full h-full flex flex-col justify-center items-center'>
        <img src={add} alt='add magnet' height={100} width={100}/>
        <h1 className='font-medium text-gray-500 pt-4'>Añade imanes a TuRefri</h1>
    </button>
  )
}
