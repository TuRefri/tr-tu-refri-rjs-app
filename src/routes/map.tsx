import { useState } from "react";
//@ts-ignore
import MapSection from "../components/MapSection";
import ModalMap from "../components/ModalMap";
import { MagnetRefriProps } from "../types";
//Area dentro de refri donde se montan componentes
export default function Map() {
  const [openModalMap, setOpenModalMap] = useState(false)
  const [data, setData] = useState<MagnetRefriProps | null>(null)

  const handleSelectStoreOnMap = (item : MagnetRefriProps) =>{
    setData(item)
    setOpenModalMap(true)
  }

  const handleCloseModal = () =>{
    console.log('click')
    setOpenModalMap(false)
    setData(null)
  }
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