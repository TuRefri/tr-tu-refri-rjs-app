import { useState, useEffect, useRef } from "react";
import { RoundedButtonTooltipCategoriesProps } from "../types";
export default function RoudedButtonTooltipCategories({ icon, className, options }: RoundedButtonTooltipCategoriesProps) {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);


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
        className="my-2 rounded-[50px] h-8 w-8 p-1 flex justify-center items-center bg-white shadow-[inset_-3px_3px_11px_#ededed,inset_3px_-3px_11px_#ffffff] active:shadow-[inset_-1px_1px_5px_#cccccc,inset_1px_-1px_5px_#f9f9f9]  transition-transform duration-150"
      >
        <img src={icon} alt='icon' />
      </button>
      {visible && (
        <div
          ref={tooltipRef}
          className="absolute z-10 inline-block px-3 py-2 ml-4 text-sm font-medium  text-black"
          style={{ top: '50%', left: '100%', transform: 'translateY(-5%)' }}
        >
          <ul className="flex flex-col">
            {options.map(item => (
              <li onClick={() =>setVisible(false)} className="cursor-pointer border bg-white rounded-r-full rounded-tl-full px-2 py-1 text-nowrap w-fit text-xs font-light my-[0.1rem] shadow-md">{item.name}</li>
            ))}
          </ul>
          <div className="tooltip-arrow" />
        </div>
      )}
    </div>
  );
}
