import s from './RoundedButton.module.css';

interface RoundedButtonProps {
  href: string;
  icon: string;
  theme?: themeButton;
  className?: string;
}

type themeButton = "dark" | "white";

export default function RoundedButton({ href, icon, theme, className }: RoundedButtonProps) {
  const classNameTheme = theme === 'dark'
    ? "rounded-[50px] h-6 w-6 p-1 flex justify-center items-center bg-[#121212]"
    : "rounded-[50px] h-8 w-8 p-1 flex justify-center items-center bg-white shadow-[inset_-3px_3px_11px_#ededed,inset_3px_-3px_11px_#ffffff]";
  
  const combinedClassName = `${classNameTheme} ${className || ''}`.trim();

  return (
    <button className={combinedClassName}>
      <img src={icon} alt='icon' />
    </button>
  );
}
