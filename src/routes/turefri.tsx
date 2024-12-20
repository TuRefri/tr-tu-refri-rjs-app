import { useState, useEffect, useRef } from "react";
import { useDetailMagnetContext } from "../context/detail-magnet-context";
import MagnetRefri from "../components/MagnetRefri";
import { useMagnetGroupsContext } from "../context/magnet-groups";
import Slider from "../components/Slider";
import ModalMagnetRefri from "../components/ModalMagnetRefri";
import AddMagnets from "../components/AddMagnets";
import { useGlobalContext } from "../context/global-context";
import ModalNotAuth from "../components/ModalNotAuth";
import DropDownMagnetGroups from "../components/DropDownMagnetGroups";
import { deleteMagnetOnDB } from "../functions/mutations_grapql";
import { toast } from "sonner";
import SimpleLoadingComponent from "../components/SimpleLoadingComponent";
import ModalCreateMagnetGroup from "../components/ModalCreateMagnetGroup";
import { Link } from "react-router-dom";
//import DropDownRefri from "../components/DropDownRefri";
const IMAGES =[
  {url: '/images/banner/banner_coca_cola.webp', alt: "banner 1"},
  {url: '/images/banner/burguer-king-banner.webp', alt: "banner 2"},
  {url: '/images/banner/pepsi-banner_1.webp', alt: "banner 3"},
  {url: '/images/banner/starbucks-banner_1.webp', alt: "banner 4"},
]
export default function TuRefri() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const[sideBarDim, setSideBarDim] = useState(0)
  const [showNotAuthModal, setShowNotAuthModal] = useState(false)
  const [showCreateMagnetGroupModal, setShowCreateMagnetGroupModal] = useState(false)
  const { selectedMagnetGroup, selectedCategory, handleSelectCategory } = useGlobalContext();
  const {isOpen, handleClose } = useDetailMagnetContext();
  const { magnetgroups, loadingMagnets, refetch } = useMagnetGroupsContext()

  const handleCloseNotAuthModal = () =>{
    setShowNotAuthModal(false)
  }
  const handleOpenNotAuthModal = () =>{
    setShowNotAuthModal(true)
  }
  const handleCloseCreateMagnetGroupModal = (newMagnetGroup: boolean) =>{
    if(newMagnetGroup){
      refetch()
    }
    setShowCreateMagnetGroupModal(false)
  }
  const handleOpenCreateMagnetGroupModal = () =>{
    setShowCreateMagnetGroupModal(true)
  }
  const logHeight = () => {
    if (sidebarRef.current) {
      setSideBarDim(sidebarRef.current.clientHeight)
    }
  };

  useEffect(() => {
    // Log initial height
    logHeight();

    // Add a resize event listener
    window.addEventListener('resize', logHeight);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', logHeight);
    };
  }, []);
  const handleDeleteMagnet = async (id : string) =>{
    try {
      await deleteMagnetOnDB(id)
      refetch()
      handleClose()
      toast.success('Imán eliminado exitosamente', {duration: 2000,  position: 'top-center'})
    } catch (error) {
      toast.error('Error al eliminar el imán de Tu Refri', {duration: 2000,  position: 'top-center'})
    }
  }
  const magnetsToShow = () => {
    if (loadingMagnets) {
      return [];
    } else if (/* !selectedMagnetGroup &&  */magnetgroups.length === 0) {
      return [];
    } /* else if (!selectedMagnetGroup && magnetgroups.length > 0) {
      return magnetgroups[0]?.magnets?.items || [];
    } */
    return selectedMagnetGroup?.magnets?.items || [];
  };
  
  const magnetList = magnetsToShow();
  const magnetListFilteredByCategory = selectedCategory !== '' ?
    magnetList.filter(item => item.location.store.categories.items[0].category.name === selectedCategory.name)
    :
    magnetList
  return (
    <div ref={sidebarRef} className="w-full h-full flex flex-col px-4">
      <div className="w-full flex justify-center pt-6 pb-4">
        <img src="/turefri-logo.png" className="w-56" />
      </div>
      <Slider images={IMAGES} />
      <section className={`w-full flex ${selectedCategory !== '' ? "justify-between" : 'justify-end'} items-center py-2`}>
        {selectedCategory !== '' && (
          <button 
            onClick={() => handleSelectCategory('')}
            className={`cursor-pointer ml-2 py-1 px-3 bg-gray-400 text-white flex items-center rounded-lg text-sm  font-medium mt-1 whitespace-nowrap`}
            >{selectedCategory.name}</button>
          )}
        <DropDownMagnetGroups magnetgroups={magnetgroups} loading={loadingMagnets} handleOpenCreateMagnetGroupModal={handleOpenCreateMagnetGroupModal} refetch={refetch}/>
      </section>
      <ul className={`${sideBarDim < 650 ? "gap-2" : "gap-3"} relative flex-grow grid grid-cols-2 p-4 overflow-y-scroll no-scrollbar`}>
      {loadingMagnets ? (
          <SimpleLoadingComponent loadingText="Cargando imanes" size="20" className="absolute" />
        ) : magnetList && magnetList.length > 0 && magnetListFilteredByCategory.length > 0 ? (
          magnetListFilteredByCategory.map((item) => (
            <li key={item.id}>
              <MagnetRefri item={item} />
            </li>
          ))
        ) : magnetList && magnetList.length > 0 ? (
          <li className="absolute h-full w-full flex flex-col pt-10 items-center pl-4 pr-10">
            <p className="text-xl text-gray-800 font-semibold mb-2">¡Ups! No hay imanes que coincidan con esta categoría.</p>
            <p className="text-md text-gray-600">¡Pero no te preocupes, sigue explorando otras opciones! O puedes ir al mapa para 
              buscar tiendas de esta categoría.
            </p>

            <Link 
              to={"/map"}
              className="w-full bg-blue-500 text-white font-medium text-center py-2 mt-2 rounded-md active:bg-blue-600"
              >Ir al mapa</Link>
          </li>
        ) : (
          <li className="absolute h-full w-full">
            <AddMagnets handleOpenModal={handleOpenNotAuthModal} />
          </li>
        )}

        {magnetsToShow.length < 6 && (
          <li className={`col-span-2 ${sideBarDim < 650 ? "h-20" : "h-32"}`}></li>
        )}
        {magnetsToShow.length < 4 && (
          <li className={`col-span-2 ${sideBarDim < 650 ? "h-20" : "h-32"}`}></li>
        )}
        </ul>
        {isOpen && (
          <div className="absolute inset-0 flex items-end justify-center z-20 my-2 ">
          <ModalMagnetRefri handleDeleteMagnet={handleDeleteMagnet}/>
        </div>
      )}
      {
        showNotAuthModal &&
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full">
          <ModalNotAuth handleCloseModal={handleCloseNotAuthModal}/>
        </div>
        
      }
      {
        showCreateMagnetGroupModal &&
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full">
          <ModalCreateMagnetGroup handleCloseModal={handleCloseCreateMagnetGroupModal}/>
        </div>
        
      }
    </div>
  );
}
