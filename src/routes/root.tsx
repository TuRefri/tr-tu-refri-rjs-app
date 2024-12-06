
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useFridgeContext } from "../context/fridge-color-context";
import { useLocation } from 'react-router-dom';
/* import axios from "axios"; */
/* import { useGlobalContext } from "../context/global-context"; */
export default function Root() {
    /* const { handleSetStaticPosition } = useGlobalContext() */
    const location = useLocation();
    const { currentColor, setRefriDim } = useFridgeContext();
    const refriDimRef = useRef<HTMLDivElement>(null);
    const logHeight = () => {
      if (refriDimRef.current) {
        setRefriDim({
          height: refriDimRef.current.clientHeight,
          width: refriDimRef.current.clientWidth
        })
      }
    };
  
    useEffect(() => {
      /* if(!window.localStorage.getItem('aprox_position')){

        axios.get(`https://ipinfo.io/json?token=${import.meta.env.VITE_IP_INFO_API_KEY}`)
        .then(response => {
          handleSetStaticPosition(
            parseInt(response.data.loc.split(',')[0]),
            parseInt(response.data.loc.split(',')[1])
          )
        })
        .catch(e => {
          console.log(e);
        });
      } */

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
      <div  className="flex h-[100dvh] w-full justify-center bg-slate-200 items-center">
            <SideBar />
            <section ref={refriDimRef} id="detail" className=" h-[90%]  max-w-[25rem] rounded-3xl w-full bg-transparent mr-4">
            <article 
              className={`relative h-full rounded-3xl overflow-hidden
                          ${currentColor.shadow}`} 
              style={{ backgroundColor: currentColor.hexColor }}>
                  {
                  (location.pathname === "/")
                  && (
                    <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex flex-col items-end">
                      {/* <img src="/turefri-logo.png" className="w-24 mr-4 pb-2" /> */}
                      <img src="/images/handle.webp" className="" />
                    </div>

                  )}
                  
                  <Outlet />
              </article>
            </section>
      </div>
    );
}
