import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useFridgeContext } from "../context/fridge-color-context";

export default function Root() {
    const { currentColor } = useFridgeContext();
    
    return (
      <div className="flex h-[100dvh] w-full justify-center bg-slate-200 items-center">
            <SideBar />
            <section id="detail" className=" h-[90%] pl-1 max-w-[21rem] pr-2 w-full bg-transparent">
            <article 
              className={`relative h-full rounded-3xl px-4 border border-transparent 
                          transition-all duration-500 ease-in-out ${currentColor.shadow}`} 
              style={{ backgroundColor: currentColor.hexColor }}>
                  <img src="/images/handle.png" className="absolute right-1 top-1/2 transform -translate-y-1/2 "/>
                  <Outlet />
              </article>
            </section>
      </div>
    );
}
