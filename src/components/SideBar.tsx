import { SideBarButton } from '../types/index'
import RoundedButton from './RoundedButton';
import redes from '../data/redes-sociales.json'
interface SideBarProps {
    firstSection: SideBarButton[];
    secondSection: SideBarButton[];
}
export default function SideBar({firstSection, secondSection} : SideBarProps) {
  return (
    <aside className='pt-4 px-2 py-4 flex flex-col justify-center items-center'>
      <RoundedButton href='' icon='icons/person.svg'/>

      <ul className='mt-12 border border-gray-300 px-1 rounded-full'>
        {firstSection.map((item, index:number)=>{
          return(
          <li><RoundedButton className={index === 0 || index === firstSection.length - 1 ? "my-1" : "my-2"} href='' icon={`/icons/${item.icon}`} /></li>
        )
        })}
      </ul>

      <ul className='mt-12 border border-gray-300 px-1 rounded-full'>
        {secondSection.map((item, index:number) =>{
          return(
          <li><RoundedButton className={index === 0 || index === secondSection.length - 1 ? "my-1" : "my-2"} href='' icon={`/icons/${item.icon}`}/></li>
        )
        })}
      </ul>
      <div className='mt-6 border border-gray-300 p-1 rounded-full'>
        <RoundedButton  href='' icon='/icons/qr-scanner.svg'/>
      </div>
      
      <ul className='mt-8 w-full flex flex-col items-center'>
        {redes.map((item, index : number) =>{
          return(
            <li key={index}>
              <RoundedButton className="my-1" href='' icon={`/icons/social-media/${item.icon}`} theme="dark"/>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
