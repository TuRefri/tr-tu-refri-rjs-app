import { useState, useEffect, useRef } from "react";
import { Category, RoundedButtonTooltipCategoriesProps } from "../types";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGlobalContext } from "../context/global-context";

export default function RoundedButtonTooltipCategories({ icon, options }: RoundedButtonTooltipCategoriesProps) {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { handleSelectCategory } = useGlobalContext()
  const navigate = useNavigate();

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

  const handleSelectCategoryList = (item: Category) => {
    navigate("/");
    handleSelectCategory(item)
    setVisible(false);
  };

  const variants = {
    hidden: (i : number) => (i === 0 ? { opacity: 0, y: 0 } : { opacity: 0, y: -20 }),
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.02 }, // Retraso basado en el índice
    }),
  };

  return (
    <div className="relative inline-block mt-1">
      <button
        ref={buttonRef}
        onClick={() => setVisible(!visible)}
        type="button"
        className="rounded-[50px] h-8 w-8 p-1 flex justify-center items-center bg-white shadow-[inset_-3px_3px_11px_#ededed,inset_3px_-3px_11px_#ffffff] active:shadow-[inset_-1px_1px_5px_#cccccc,inset_1px_-1px_5px_#f9f9f9] transition-transform duration-150"
      >
        <img src={icon} alt='icon' />
      </button>
      {visible && (
        <motion.div
          ref={tooltipRef}
          className="absolute z-10 inline-block px-3 py-2 ml-4 text-sm font-medium text-black"
          style={{ top: '50%', left: '100%', transform: 'translateY(-5%)' }}
          initial="hidden"
          animate="visible"
        >
          <ul className="flex flex-col">
            {options.map((item, index) => (
              <motion.li
                key={index}
                onClick={() => handleSelectCategoryList(item)}
                className="cursor-pointer border bg-white rounded-r-full rounded-tl-full px-3 py-1 text-nowrap w-fit text-xs font-light my-[0.1rem] shadow-md"
                custom={index} // Pasar el índice como prop "custom"
                variants={variants}
              >
                {item.name}
              </motion.li>
            ))}
          </ul>
          <div className="tooltip-arrow" />
        </motion.div>
      )}
    </div>
  );
}
