import { useEffect, useState } from "react";
//@ts-ignore
import MapSection from "../components/MapSection";
import ModalMap from "../components/ModalMap";
import { Location } from "../types/location";
import useUserAuth from "../hooks/useUserAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
//Area dentro de refri donde se montan componentes
export default function Map() {
  const navigate = useNavigate()
  const [openModalMap, setOpenModalMap] = useState(false)
  const [data, setData] = useState<Location | null>(null)
  const { authenticated, loading } = useUserAuth()

  const handleSelectStoreOnMap = (item : Location) =>{
    setData(item)
    setOpenModalMap(true)
  }

  const handleCloseModal = () =>{
    setOpenModalMap(false)
    setData(null)
  }
  
  useEffect(() =>{
    if(!authenticated && !loading){
      toast('Para poder utilizar el mapa de TuRefri asegurate de estar logueado.', {
        action: <button 
        onClick={() => {toast.dismiss(), navigate('/auth/login') }}
        className='w-fit text-nowrap py-2 px-4 rounded-md text-blue-500 text-sm font-medium active:bg-blue-600'
        >
          Ingresar
      </button>
      });
    }
  },[authenticated])
  return(

        <div className="relative w-full h-full">
         <MapSection handleSelectStoreOnMap={handleSelectStoreOnMap} handleCloseModal={handleCloseModal}/>
         {
          openModalMap &&
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full">
            <ModalMap data={data} handleCloseModal={handleCloseModal}/>
          </div>
          
         }
        </div>

  )
}