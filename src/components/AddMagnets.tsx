
import { useNavigate } from 'react-router-dom'
import { useFridgeContext } from '../context/fridge-color-context'
import useUserAuth from '../hooks/useUserAuth';
interface AddMagnetProps {
  handleOpenModal: () => void
}

export default function AddMagnets({ handleOpenModal} : AddMagnetProps) {
  const navigate = useNavigate()
  const { currentColor } = useFridgeContext()
  const { authenticated } = useUserAuth()

  const handleActionButton = () =>{
    if(authenticated){
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
