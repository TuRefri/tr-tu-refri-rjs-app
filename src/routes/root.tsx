import { Outlet, Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import firstSection from "../data/buttons-sidebar-first.json"
import secondSection from "../data/buttons-sidebar-second.json"

export default function Root() {
    return (
      <div className="max-w-96 flex">
            <SideBar firstSection={firstSection} secondSection={secondSection}/>
            <section id="detail" className="w-full">
                <Outlet />
            </section>
      </div>
    );
  }