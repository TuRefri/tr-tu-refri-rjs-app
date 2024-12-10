import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { MagnetGroup } from '../../types/magnetGroup';
import { useGlobalContext } from '../../context/global-context';
interface DrowDropTuRefriProps {
    magnetgroups: MagnetGroup[],
    loading: boolean
}
export default function Example({magnetgroups, loading } : DrowDropTuRefriProps) {
    const { selectedMagnetGroup , handleSelectMagnetGroup } = useGlobalContext()
    return (
    <Menu as="div" className="w-fit relative inline-block text-left">
      <div>
        {loading && !selectedMagnetGroup? 
            <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                <div className="flex items-center justify-center w-24 h-8 bg-gray-200 rounded  dark:bg-gray-300" />
            </div>
            :
            <>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500">
            {selectedMagnetGroup && selectedMagnetGroup?.name}
            {(!selectedMagnetGroup && magnetgroups.length > 0 )&& magnetgroups[0].name }
            <img src="icons/chrevron-down.svg" alt='open refris' />
          </MenuButton>
          </>
        }
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >

        <div className="py-1 relative overflow-hidden">
            {magnetgroups.map(item =>{
                return(
                    <MenuItem key={item.id}>
                        <button
                        disabled
                        onClick={() => handleSelectMagnetGroup(item)}
                        className="flex mx-1 rounded-md justify-center mb-1 px-12 text-nowrap py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                        >
                        {item.name}
                        </button>
                    </MenuItem>
                )
            })}
          <MenuItem>
            <a
              href="#"
              className="flex mx-1 rounded-md justify-center px-12 text-nowrap py-2 text-sm bg-blue-200 text-blue-500 data-[focus]:bg-blue-400 data-[focus]:text-white data-[focus]:outline-none"
            >
             <img src={"icons/add-white.svg"} height={20} width={20} alt='add refri icon'/>
            </a>
          </MenuItem>
          {/* disable for the moment */}
          {/* <div className='absolute top-0 lef-0 rounded-md w-full h-full flex items-center justify-center bg-black opacity-60 text-white'>
            Proximamente
          </div> */}
        </div>
      </MenuItems>
    </Menu>
  )
}
