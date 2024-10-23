import { useState, useEffect, useRef } from "react";
import { useDetailMagnetContext } from "../context/detail-magnet-context";
import { AnimatePresence, motion } from "framer-motion";
import MagnetRefri from "../components/MagnetRefri";
import Slider from "../components/Slider";
import magnets from "../data/magnets.json"
import banner1 from "../../public/images/banner/banner_coca_cola.avif"
import banner2 from "../../public/images/banner/burguer-king-banner.avif"
import banner3 from "../../public/images/banner/pepsi-banner.avif"
import banner4 from "../../public/images/banner/starbucks-banner.avif"
import ModalMagnetRefri from "../components/ModalMagnetRefri";
import AddMagnets from "../components/AddMagnets";

const IMAGES =[
  {url: banner1, alt: "banner 1"},
  {url: banner2, alt: "banner 2"},
  {url: banner3, alt: "banner 3"},
  {url: banner4, alt: "banner 4"},
]
export default function TuRefri() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const[sideBarDim, setSideBarDim] = useState(0)
  const {isOpen, handleClose} = useDetailMagnetContext();

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
  return (
    <div ref={sidebarRef} className="w-full h-full flex flex-col overflow-y-scroll no-scrollbar px-4">
      <Slider images={IMAGES} />
      <ul className={`${sideBarDim < 650? "gap-1" : "gap-3"} relative flex-grow grid grid-cols-2  p-4`}>
        {magnets.length > 0? magnets.map((item)=>{ //TODO quitar. solo prueba < 0
          return(
            <li key={item.id}>
              <MagnetRefri item={item}/>
            </li>
        )
        }):
        <li className="col-span-2 row-span-3"><AddMagnets /></li>}
      </ul>
        {isOpen && (
        <div className="absolute inset-0 flex items-end justify-center z-20 my-2 ">
          <ModalMagnetRefri />
        </div>
      )}
    </div>
  );
}
