import { useEffect, useRef, useState } from 'react';
import RoundedButton from './RoundedButton';
import redes from '../data/redes-sociales.json';
import firstSection from "../data/buttons-sidebar-first.json";
import secondSection from "../data/buttons-sidebar-second.json";
import RoudedButtonTooltipColors from './RoudedButtonTooltipColors';
import RoudedButtonTooltipCategories from './RoudedButtonTooltipCategories';
import colorsFridge from '../data/colors-fridge.json';
import categories from '../data/list-categories.json';
import RoundedFridgeButton from './RoundedFridgeButton';
import RoundedButtonSharingPosition from './RoundedButtonSharingPosition';
/* import { useLocation } from 'react-router-dom'; */
export default function SideBar() {
  /* const location = useLocation(); */
  const sidebarRef = useRef<HTMLDivElement>(null);
  const[sideBarDim, setSideBarDim] = useState(0)

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
    <aside ref={sidebarRef} className=' pt-4 px-2 py-4 flex flex-col justify-center items-center h-[90%]'>
      <div className={`border border-gray-300 p-1 rounded-full`}>
        <RoundedButton className={""} href='/user-profile' icon='/icons/person.svg' />
      </div>

      <ul className={`${sideBarDim < 642? "mt-2" : "mt-6"} border border-gray-300 px-1 rounded-full flex flex-col justify-center items-center`}>
        {firstSection.map((item, index: number) => {
          if (item.name === 'draw') {
            return (
              <li key={index}>
                <RoudedButtonTooltipColors options={colorsFridge} className={index === 0 || index === firstSection.length - 1 ? "my-1" : "my-2"} href='' icon={`/icons/${item.icon}`} />
              </li>
            );
          }else if( item.name === 'burguer-menu') {
              return (<li key={index}>
                <RoudedButtonTooltipCategories options={categories} href='' icon={`/icons/${item.icon}`} />
              </li>)
          } 
          else if( item.name === 'fridge') {
            return (<li key={index}>
                <RoundedFridgeButton className={index === 0 || index === firstSection.length - 1 ? "my-1" : "my-2"} href={item.href ? item.href : ''} icon={`/icons/${item.icon}`} />
              </li>)
          }
          return (
            <li key={index}>
              <RoundedButton className={index === 0 || index === firstSection.length - 1 ? "my-1" : "my-1"} href={item.href ? item.href : ''} icon={`/icons/${item.icon}`} />
            </li>
          );
        })}
      </ul>

      <ul className={`${sideBarDim < 642? "mt-2" : "mt-6"} border border-gray-300 px-1 rounded-full`}>
        {secondSection.map((item, index: number) => {
          return (
            <li key={index}>
              <RoundedButton className={index === 0 || index === secondSection.length - 1 ? "my-1" : "my-2"} href={item.href ? item.href : ''} icon={`/icons/${item.icon}`} />
            </li>
          );
        })}
      </ul>
      
      <div className={`mt-4 border border-gray-300 p-1 rounded-full`}>
        <RoundedButton href='' icon='/icons/qr-scanner.svg' />
      </div>

      <div className={`${sideBarDim < 642? "mt-1" : "mt-2"} border border-gray-300 p-1 rounded-full`}>
        <RoundedButtonSharingPosition />
      </div>

      <ul className={`mt-2 w-full flex flex-col items-center`}>
        {redes.map((item, index: number) => {
          if(index < 2){
            return (
            <li key={index}>
              <RoundedButton className="my-1" href='' icon={`/icons/social-media/${item.icon}`} theme="dark" />
            </li>
          );}
        })}
      </ul>
    </aside>
  );
}
