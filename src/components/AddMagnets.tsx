
import { Link } from 'react-router-dom'
import { useFridgeContext } from '../context/fridge-color-context'
import { IoIosAddCircleOutline } from "react-icons/io";
export default function AddMagnets() {
  const { currentColor } = useFridgeContext()
  return (
    <Link to="/map" className='relative w-full h-full flex flex-col justify-center items-center'>
        <IoIosAddCircleOutline className='text-[7rem]' style={{color: currentColor.textSecondaryColor}}/>
        <h1 className='font-medium pt-4' style={{color: currentColor.textSecondaryColor}}>Añade imanes a TuRefri</h1>
    </Link>
  )
}
