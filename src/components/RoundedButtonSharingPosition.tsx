import { useGlobalContext } from "../context/global-context";
import { MdLocationDisabled, MdLocationSearching, MdMyLocation } from "react-icons/md";
export default function RoundedButtonSharingPosition() {
  const { handleToggleSharePosition, sharingPosition, position } = useGlobalContext()
  return (
    <button
        onClick={() => handleToggleSharePosition()}
        className="rounded-[50px] h-8 w-8 p-1 flex justify-center items-center bg-white shadow-[inset_-3px_3px_11px_#ededed,inset_3px_-3px_11px_#ffffff] active:shadow-[inset_-1px_1px_5px_#cccccc,inset_1px_-1px_5px_#f9f9f9]  transition-transform duration-150"
        >
      {(!sharingPosition && !position)?
        <MdLocationDisabled className="text-red-600"/>
        :
        (sharingPosition && !position)?
        <MdLocationSearching className="text-[#434343]"/>
        :
        <MdMyLocation className="text-blue-600"/>
        }
    </button>
  );
}
