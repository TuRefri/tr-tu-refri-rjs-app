import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useFridgeContext } from "../context/fridge-color-context";

export default function Root() {
    const { currentColor } = useFridgeContext();
    
    return (
      <div className="flex h-[100dvh] w-full justify-center bg-slate-200">
            <SideBar />
            <section id="detail" className="pl-1 max-w-[21rem] pr-2 w-full h-full bg-transparent">
            <article 
              className={`relative h-[95dvh] rounded-[2rem] my-4 px-2 border border-transparent 
                          transition-all duration-500 ease-in-out ${currentColor.shadow}`} 
              style={{ backgroundColor: currentColor.hexColor }}>
                  <img src="/images/handle.png" className="absolute right-1 top-1/2 transform -translate-y-1/2 "/>
                  <Outlet />
              </article>
            </section>
      </div>
    );
}
