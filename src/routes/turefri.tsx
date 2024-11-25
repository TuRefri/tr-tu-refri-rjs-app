import { useState, useEffect, useRef } from "react";
import { useDetailMagnetContext } from "../context/detail-magnet-context";
import MagnetRefri from "../components/MagnetRefri";
import Slider from "../components/Slider";
import ModalMagnetRefri from "../components/ModalMagnetRefri";
import AddMagnets from "../components/AddMagnets";
import { useGlobalContext } from "../context/global-context";
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
  const { magnets, selectedCategory } = useGlobalContext();
  const {isOpen} = useDetailMagnetContext();

  
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

  let magnetsToShow = selectedCategory !== '' ? magnets.filter(item => item.category === selectedCategory.name) : magnets
  return (
    <div ref={sidebarRef} className="w-full h-full flex flex-col overflow-y-scroll no-scrollbar px-4">
      <div className="w-full flex justify-center pt-6 pb-4">
        <img src="/turefri-logo.png" className="w-56" />
      </div>
      <Slider images={IMAGES} />
     {/*  <DropDownRefri /> */}
      <ul className={`${sideBarDim < 650 ? "gap-2" : "gap-3"} relative flex-grow grid grid-cols-2 p-4`}>
          {magnetsToShow && magnetsToShow.length > 0 ? (
            magnetsToShow.map((item) => (
              <li key={item.id}>
                <MagnetRefri item={item} />
              </li>
            ))
          ) : (
            <li className="absolute h-full w-full">
              <AddMagnets />
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
          <ModalMagnetRefri />
        </div>
      )}
    </div>
  );
}
