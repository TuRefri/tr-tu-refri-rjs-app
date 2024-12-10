import { useState } from "react";
//@ts-ignore
import MapSection from "../components/MapSection";
import ModalMap from "../components/ModalMap";
import { Location } from "../types/location";
import ModalNotAuth from "../components/ModalNotAuth";
//Area dentro de refri donde se montan componentes
export default function Map() {
  const [openModalMap, setOpenModalMap] = useState(false)
  const [data, setData] = useState<Location | null>(null)
  const [showNotAuthModal, setShowNotAuthModal] = useState(false)
  
  const handleCloseNotAuthModal = () =>{
    setShowNotAuthModal(false)
  }
  const handleOpenNotAuthModal = () =>{
    setShowNotAuthModal(true)
  }
  const handleSelectStoreOnMap = (item : Location) =>{
    setData(item)
    setOpenModalMap(true)
  }

  const handleCloseModal = () =>{
    setOpenModalMap(false)
    setData(null)
  }
  return(

        <div className="relative w-full h-full">
         <MapSection handleSelectStoreOnMap={handleSelectStoreOnMap} handleCloseModal={handleCloseModal}/>
         {
          openModalMap &&
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full">
            <ModalMap data={data} handleCloseModal={handleCloseModal} handleOpenNotAuthModal={handleOpenNotAuthModal}/>
          </div>
          
         }
         {
          showNotAuthModal &&
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full">
            <ModalNotAuth handleCloseModal={handleCloseNotAuthModal}/>
          </div>
          
        }
        </div>

  )
}