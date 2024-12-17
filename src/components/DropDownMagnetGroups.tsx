import { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { MagnetGroup } from '../types/magnetGroup';
import { useGlobalContext } from '../context/global-context';
import { updateMagnetGroupOnDB } from '../functions/mutations_grapql';
import { toast } from 'sonner';
import { useUserContext } from '../context/user-auth';
interface DrowDropTuRefriProps {
    magnetgroups: MagnetGroup[],
    loading: boolean
    handleOpenCreateMagnetGroupModal: () => void
}
export default function DropDownMagnetGroups({magnetgroups, loading, handleOpenCreateMagnetGroupModal } : DrowDropTuRefriProps) {
    const { selectedMagnetGroup , handleSelectMagnetGroup} = useGlobalContext()
    const [localMagnetGroups, setLocalMagnetGroups] = useState(magnetgroups);
    const { user } = useUserContext()
    useEffect(() => {
      const sortedMagnetGroups = [...magnetgroups].sort((a, b) => {
        return a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1;
      });
      setLocalMagnetGroups(sortedMagnetGroups);
    }, [magnetgroups]);
    const handleChangeFavoriteLocally = (id: string) => {
      return localMagnetGroups.map((item) => ({
        ...item,
        favorite: item.id === id,
      }));
    };
    const handleUpdateFavorite = async (item: MagnetGroup) =>{
      console.log(item, 'new fav')
      const currentFavorite = localMagnetGroups.find(item => item.favorite)
      console.log(currentFavorite, 'old fav')
      if(currentFavorite && currentFavorite.id === item.id){
        return 
      }else{
        try {
          //@ts-ignore
          const oldFavorite = {id: currentFavorite.id, favorite: false}
          //@ts-ignore
          await updateMagnetGroupOnDB(oldFavorite)

          const newFavorite ={ id: item.id, favorite: true}
          await updateMagnetGroupOnDB(newFavorite)
          setLocalMagnetGroups(handleChangeFavoriteLocally(item.id));
          toast.success(`¡${item.name} es tu nuevo Refri favorito!`, {duration: 2000,  position: 'top-center'});
        } catch (error) {
          console.log(error)
        }
      }
    }
    return (
    <Menu as="div" className="w-fit relative inline-block text-left">
      <div>
        {loading? 
            <MenuButton disabled className="inline-flex w-full justify-end gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 min-w-20">
              <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-4 h-4 text-gray-500 animate-spin dark:text-gray-500 fill-gray-100 dark:fill-gray-100"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
              <img src="/icons/chrevron-down.svg" alt='open refris' />
            </MenuButton>
            :
            <>
            <MenuButton disabled={!user} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500">
            {(selectedMagnetGroup && user )&& selectedMagnetGroup?.name || 'Refri 1' }
            {(!selectedMagnetGroup && magnetgroups.length > 0 )&& magnetgroups[0].name }
            <img src="/icons/chrevron-down.svg" alt='open refris' />
          </MenuButton>
          </>
        }
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >

        <div className="py-1 relative overflow-hidden flex flex-col">
            {localMagnetGroups.map(item =>{
                return(
                    <MenuItem key={item.id}>
                      <div 
                        onClick={() => handleSelectMagnetGroup(item)}
                        className='cursor-pointer relative flex justify-center space-x-2 py-3 mx-1 rounded-md mb-1 w-48 text-sm font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none'>
                          <button
                          className="text-nowrap"
                          >
                          {item.name}
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateFavorite(item);
                            }}
                            className='absolute z-30 p-1 flex items-center justify-center right-1 top-1/2 transform -translate-y-1/2'
                          >
                            {item.favorite?
                              <img src='/icons/star_magnetgroup_selected.svg' alt='make it favorite' className={`h-8 w-8`} />
                              :
                              <img src='/icons/star_magnetgroup.svg' alt='make it favorite' className={`h-8 w-8`} />
                            }
                            
                          </button>
                        </div>
                    </MenuItem>
                )
            })}
          <MenuItem>
          <button
            onClick={
              handleOpenCreateMagnetGroupModal
            }
            className="flex mx-1 rounded-md justify-center items-center px-12 py-2 text-sm bg-blue-200 text-blue-500 hover:bg-blue-300 focus:bg-blue-400 focus:text-white focus:outline-none"
          >
            <img
              src="/icons/add-white.svg"
              height={20}
              width={20}
              alt="Añadir Refri"
            />
          </button>

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
