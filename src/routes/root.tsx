
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useFridgeContext } from "../context/fridge-color-context";

export default function Root() {
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
            <section ref={refriDimRef} id="detail" className=" h-[90%]  max-w-[30rem] rounded-3xl w-full bg-transparent">
            <article 
              className={`relative h-full rounded-3xl overflow-hidden border border-transparent 
                          transition-all duration-500 ease-in-out ${currentColor.shadow}`} 
              style={{ backgroundColor: currentColor.hexColor }}>
                  <img src="/images/handle.png" className="absolute right-1 top-1/2 transform -translate-y-1/2 "/>
                  <Outlet />
              </article>
            </section>
      </div>
    );
}
