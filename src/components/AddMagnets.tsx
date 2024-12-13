
import { useNavigate } from 'react-router-dom'
import { useFridgeContext } from '../context/fridge-color-context'
import { useUserContext } from '../context/user-auth';
interface AddMagnetProps {
  handleOpenModal: () => void
}

export default function AddMagnets({ handleOpenModal} : AddMagnetProps) {
  const navigate = useNavigate()
  const { currentColor } = useFridgeContext()
  const { user } = useUserContext()
  const handleActionButton = () =>{
    if(user){
      navigate('/map')
    } else{
      handleOpenModal()
    }
  }
  return (
    <button onClick={handleActionButton} className='relative w-full h-full flex flex-col justify-center items-center'>
        <img src='/icons/add-icon.svg' height={120} width={120} alt='add icon' />
        <h1 className='font-medium pt-4' style={{color: currentColor.textSecondaryColor}}>Añade imanes a TuRefri</h1>
    </button>
  )
}
