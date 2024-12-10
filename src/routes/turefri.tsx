import { useState, useEffect, useRef } from "react";
import { useDetailMagnetContext } from "../context/detail-magnet-context";
import MagnetRefri from "../components/MagnetRefri";
import useGetMagnets from "../hooks/useGetMagnets";
import Slider from "../components/Slider";
import ModalMagnetRefri from "../components/ModalMagnetRefri";
import AddMagnets from "../components/AddMagnets";
import { useGlobalContext } from "../context/global-context";
import ModalNotAuth from "../components/ModalNotAuth";
import Example from "../components/test/ExampleDropdown";
import { deleteMagnetOnDB } from "../functions/mutations_grapql";
import { toast } from "sonner";
//import DropDownRefri from "../components/DropDownRefri";
const IMAGES =[
  {url: '/images/banner/banner_coca_cola.avif', alt: "banner 1"},
  {url: '/images/banner/burguer-king-banner.avif', alt: "banner 2"},
  {url: '/images/banner/pepsi-banner.avif', alt: "banner 3"},
  {url: '/images/banner/starbucks-banner.avif', alt: "banner 4"},
]
export default function TuRefri() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const[sideBarDim, setSideBarDim] = useState(0)
  const [showNotAuthModal, setShowNotAuthModal] = useState(false)
  const { selectedMagnetGroup, selectedCategory, handleSelectMagnetGroup, handleSelectCategory } = useGlobalContext();
  const {isOpen, handleClose } = useDetailMagnetContext();
  const { magnetgroups, loadingMagnets, refetch } = useGetMagnets()

  useEffect(() =>{
    if(!selectedMagnetGroup && magnetgroups.length > 0){
      handleSelectMagnetGroup(magnetgroups[0])
    }
  },[magnetgroups])
  const handleCloseNotAuthModal = () =>{
    setShowNotAuthModal(false)
  }
  const handleOpenNotAuthModal = () =>{
    setShowNotAuthModal(true)
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
      toast.success('Imán eliminado exitosamente', {duration: 1200})
    } catch (error) {
      toast.error('Error al eliminar el imán de Tu Refri', {duration: 1200})
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
    return magnetgroups[0]?.magnets?.items || [];
  };
  
  const magnetList = magnetsToShow();
  const magnetListFilteredByCategory = selectedCategory !== '' ?
    magnetList.filter(item => item.location.store.categories.items[0].category.name === selectedCategory.name)
    :
    magnetList
  return (
    <div ref={sidebarRef} className="w-full h-full flex flex-col overflow-y-scroll no-scrollbar px-4">
      <div className="w-full flex justify-center pt-6 pb-4">
        <img src="/turefri-logo.png" className="w-56" />
      </div>
      <Slider images={IMAGES} />
      <section className={`w-full flex ${selectedCategory !== '' ? "justify-between" : 'justify-end'} items-center py-2`}>
        {selectedCategory !== '' && (
          <p 
            onClick={() => handleSelectCategory('')}
            className={`cursor-pointer ml-2 py-1 px-3 bg-gray-400 text-white flex items-center rounded-lg text-sm  font-medium mt-1 whitespace-nowrap`}
            >{selectedCategory.name}</p>
          )}
        <Example magnetgroups={magnetgroups} loading={loadingMagnets}/>
      </section>
      <ul className={`${sideBarDim < 650 ? "gap-2" : "gap-3"} relative flex-grow grid grid-cols-2 p-4`}>
          {loadingMagnets ? (
            <li className="absolute h-full w-full flex flex-col justify-center items-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-20 h-20 text-gray-500 animate-spin dark:text-gray-500 fill-gray-100 dark:fill-gray-100"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
              <h1 className="pt-4 text-gray-500 font-medium">Cargando imanes</h1>
            </li>
          ) : magnetList && magnetList.length > 0 ? (
            magnetListFilteredByCategory.map((item) => (
              <li key={item.id}>
                <MagnetRefri item={item} />
              </li>
            ))
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
    </div>
  );
}
