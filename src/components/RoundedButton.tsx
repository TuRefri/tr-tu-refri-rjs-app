import { RoundedButtonProps } from "../types";
import { Link, useNavigate } from "react-router-dom";
import LogOutButton from "./LogOutButton";
import useUserAuth from "../hooks/useUserAuth";
import { toast } from "sonner";
export default function RoundedButton({ href, icon, theme, className }: RoundedButtonProps) {
  const { authenticated } = useUserAuth()
  const navigate = useNavigate()
  const classNameTheme = theme === 'dark'
    ? "rounded-[50px] h-6 w-6 p-1 flex justify-center items-center bg-[#121212]"
    : "rounded-[50px] h-8 w-8 p-1 flex justify-center items-center bg-white shadow-[inset_-3px_3px_11px_#ededed,inset_3px_-3px_11px_#ffffff] active:shadow-[inset_-1px_1px_5px_#cccccc,inset_1px_-1px_5px_#f9f9f9]  transition-transform duration-150";
  
  const combinedClassName = `${classNameTheme} ${className || ''}`.trim();

  const handleActionButton = () =>{
    if(!authenticated){
      toast('¡Inicia sesión para aprovechar esta función!', {
        action: <button 
        onClick={() => {toast.dismiss(), navigate('/auth/login') }}
        className='w-fit text-nowrap py-2 px-4 rounded-md text-blue-500 text-sm font-medium active:bg-blue-600'
        >
          Ingresar
      </button>,
      duration: 2000,
      position: 'top-center'
      });
    } else{
      navigate('/events')
    }
  }
  if(href === '/logout') return(
    <LogOutButton combinedClassName={combinedClassName} icon={icon}/>
  )

  if(href === '/events') return(
    <button
        onClick={() => handleActionButton()}
        type="button"
        className={combinedClassName}
      >
        <img src={icon} alt='icon' />
      </button>
  )
  return (
    <Link to={href} className={combinedClassName}>
      <img src={icon} alt='icon' />
    </Link>
  );
}
