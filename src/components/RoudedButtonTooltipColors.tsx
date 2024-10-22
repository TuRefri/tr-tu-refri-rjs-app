import { useState, useEffect, useRef } from "react";
import { RoundedButtonTooltipProps } from "../types";
import { useFridgeContext } from "../context/fridge-color-context";

export default function RoudedButtonTooltipColors({ icon, theme, className, options }: RoundedButtonTooltipProps) {
  const { setCurrentColor } = useFridgeContext();  
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const classNameTheme = theme === 'dark'
    ? "rounded-[50px] h-6 w-6 p-1 flex justify-center items-center bg-[#121212]"
    : "rounded-[50px] h-8 w-8 p-1 flex justify-center items-center bg-white shadow-[inset_-3px_3px_11px_#ededed,inset_3px_-3px_11px_#ffffff] active:shadow-[inset_-1px_1px_5px_#cccccc,inset_1px_-1px_5px_#f9f9f9] active:translate-z-[-2px] transition-transform duration-150";
  
  const combinedClassName = `${classNameTheme} ${className || ''}`.trim();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current && !buttonRef.current.contains(event.target as Node) &&
      tooltipRef.current && !tooltipRef.current.contains(event.target as Node)
    ) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setVisible(!visible)}
        type="button"
        className={combinedClassName}
      >
        <img src={icon} alt='icon' />
      </button>
      {visible && (
        <div
          ref={tooltipRef}
          className="absolute z-10 inline-block px-3 py-2 ml-2 text-sm font-medium text-white bg-gray-100 rounded-full shadow-[inset_-3px_3px_11px_#ededed,inset_3px_-3px_11px_#ffffff]"
          style={{ top: '50%', left: '100%', transform: 'translateY(-50%)' }}
        >
          <ul className="flex">
            {options.map(item => (
              <li key={item.name} className="px-1 flex items-center justify-center">
                <button
                  onClick={() => {
                    setCurrentColor(item);
                    setVisible(false); // Cerrar el tooltip al seleccionar un color
                  }}
                  className={`rounded-[80px] h-8 w-8 ${item.shadow}`}
                  style={{ backgroundColor: item.hexColor }}
                />
              </li>
            ))}
          </ul>
          <div className="tooltip-arrow" />
        </div>
      )}
    </div>
  );
}
