
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
interface ModalNotAuthProps {
    handleCloseModal: () => void
}
export default function ModalNotAuth({ handleCloseModal } : ModalNotAuthProps) {
    const navigate = useNavigate()

  const  determinePeriod = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 12) {
        return "¡Buenos días!";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "¡Buenas tardes!";
    } else {
        return "¡Buenas noches!";
    }
  }
  const hiText = determinePeriod()
  return (
    <motion.div
      initial={{scale: 1, y: 400}}
      animate={{scale: 1, y: 0}}
      transition={{duration: .3, ease:'easeOut'}}
      className='w-full rounded-t-3xl  bg-white text-gray-700 min-h-56 px-8 py-10 z-50'
    >
        <div className='w-full flex pb-6'>
            <button className="absolute top-4 right-4 rounded-[50px] h-8 w-8 p-1 flex justify-center items-center bg-white shadow-md active:shadow-[inset_-1px_1px_5px_#cccccc,inset_1px_-1px_5px_#f9f9f9]  transition-transform duration-150" onClick={() => handleCloseModal()}>
                <img src={'/icons/close.svg'} alt='close' />
            </button>
            {/* contenido */}
            <section>
                <p className='text-2xl font-medium pb-1'>{hiText}</p>
                <p>Para poder ver las tiendas de <span className='font-semibold'>Tu Refri</span>, por favor asegúrate de estar logueado.</p>
            </section>
            {/* contenido */}
        </div>  
        <button 
          onClick={() => navigate('/auth/login')}
          className='w-full border py-2 text-sm rounded-md bg-blue-500 text-white font-medium active:bg-blue-600'
          >
            Ingresa aquí
        </button>
    </motion.div>
  )
}
