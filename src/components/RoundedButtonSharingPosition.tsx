import { useGlobalContext } from "../context/global-context";
export default function RoundedButtonSharingPosition() {
  const { handleToggleSharePosition, sharingPosition, position } = useGlobalContext()
  return (
    <button
        onClick={() => handleToggleSharePosition()}
        className="rounded-[50px] h-8 w-8 p-1 flex justify-center items-center bg-white shadow-[inset_-3px_3px_11px_#ededed,inset_3px_-3px_11px_#ffffff] active:shadow-[inset_-1px_1px_5px_#cccccc,inset_1px_-1px_5px_#f9f9f9]  transition-transform duration-150"
        >
      {(!sharingPosition && !position)?
        <img 
          src="icons/crosshairs-off.svg" 
          alt="Descripción de la imagen" 
          height={18}
          width={18}
          style={{
            filter: 'invert(21%) sepia(76%) saturate(2290%) hue-rotate(345deg) brightness(103%) contrast(97%)'
          }} 
        />
        :
        (sharingPosition && !position)?
        <img 
          src="icons/crosshairs.svg" 
          alt="Descripción de la imagen" 
          height={18}
          width={18}
          style={{
            filter: 'invert(21%) sepia(3%) saturate(0%) hue-rotate(128deg) brightness(89%) contrast(81%)'
          }} 
        />
        :
        <img 
          src="icons/crosshairs-gps.svg" 
          alt="Descripción de la imagen" 
          height={18}
          width={18}
          style={{
            filter: 'invert(48%) sepia(67%) saturate(7294%) hue-rotate(215deg) brightness(94%) contrast(95%)'
          }} 
        />
        }
    </button>
  );
}
