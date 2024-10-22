import { RoundedButtonProps } from "../types";
import { Link } from "react-router-dom";

export default function RoundedButton({ href, icon, theme, className }: RoundedButtonProps) {
  const classNameTheme = theme === 'dark'
    ? "rounded-[50px] h-6 w-6 p-1 flex justify-center items-center bg-[#121212]"
    : "rounded-[50px] h-8 w-8 p-1 flex justify-center items-center bg-white shadow-[inset_-3px_3px_11px_#ededed,inset_3px_-3px_11px_#ffffff] active:shadow-[inset_-1px_1px_5px_#cccccc,inset_1px_-1px_5px_#f9f9f9]  transition-transform duration-150";
  
  const combinedClassName = `${classNameTheme} ${className || ''}`.trim();

  return (
    <Link to={href} className={combinedClassName}>
      <img src={icon} alt='icon' />
    </Link>
  );
}
