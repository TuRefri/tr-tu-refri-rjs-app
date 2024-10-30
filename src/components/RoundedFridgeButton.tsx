import { useGlobalContext } from "../context/global-context";
import { RoundedButtonProps } from "../types";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function RoundedFridgeButton({ href, icon, theme, className }: RoundedButtonProps) {
  const { addMagnet } = useGlobalContext();
  const controls = useAnimation();

  const classNameTheme = theme === 'dark'
    ? "relative rounded-[50px] h-6 w-6 p-1 flex justify-center items-center bg-[#121212]"
    : "relative rounded-[50px] h-8 w-8 p-1 flex justify-center items-center bg-white shadow-[inset_-3px_3px_11px_#ededed,inset_3px_-3px_11px_#ffffff] active:shadow-[inset_-1px_1px_5px_#cccccc,inset_1px_-1px_5px_#f9f9f9] transition-transform duration-150";

  const combinedClassName = `${classNameTheme} ${className || ''}`.trim();

  useEffect(() => {
    if (addMagnet) {
      controls.start({
        scale: 1,
        transition: { duration: 0.2, ease: 'easeInOut' },
      });

      const timeout = setTimeout(() => {
        controls.start({ scale: 0, transition: { duration: 0.1, ease: "linear" } });
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [addMagnet, controls]);

  // Determina el contenido y el color según el valor de addMagnet
  let displayValue;
  let bgColor = "bg-blue-500"; // Color por defecto

  if (addMagnet < 0) {
    displayValue = '-1';
    bgColor = "bg-red-500";
  } else if (addMagnet > 0) {
    displayValue = '+1';
  }

  return (
    <Link to={href} className={combinedClassName}>
      <img src={icon} alt='icon' />
      {addMagnet !== 0 && (
        <motion.div
          initial={{ scale: 0.2 }}
          className={`absolute inset-0 ${bgColor} rounded-full flex justify-center items-center`}
          animate={controls}
        >
          <p className="text-white">{displayValue}</p>
        </motion.div>
      )}
    </Link>
  );
}
