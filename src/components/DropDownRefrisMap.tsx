import { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { MagnetGroup } from '../types/magnetGroup';
import { Location } from '../types/location';
import { useGlobalContext } from '../context/global-context';
import { updateMagnetGroupOnDB } from '../functions/mutations_grapql';
import { toast } from 'sonner';
interface DropDownRefrisMap{
  data: Location | null;
  magnetgroups: MagnetGroup[]
  handleActionButton: (data : Location | null, magnetGroup: MagnetGroup | null) => void
}
export default function DropDownRefrisMap({ data, magnetgroups, handleActionButton }: DropDownRefrisMap) {
    const { selectedMagnetGroup } = useGlobalContext()
    const [localMagnetGroups, setLocalMagnetGroups] = useState(magnetgroups);

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
    <Menu as="div" className="w-fit h-full relative inline-block text-left">

        <MenuButton className='w-fit border py-2 h-full  px-2 text-sm rounded-md bg-blue-500 text-white font-medium active:bg-blue-600'>
            <img src='/icons/vertical_dots.svg' alt='more refris'/>
        </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mb-2 w-fit origin-bottom-right bottom-full rounded-lg bg-white  ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >

        <div className="py-1 relative overflow-hidden flex flex-col">
            {localMagnetGroups.map(item =>{
                    if(item.id === selectedMagnetGroup?.id) return
                    return(
                        <MenuItem key={item.id}>
                          <div className='relative flex justify-center space-x-2 py-3 mx-1 rounded-md mb-1 w-48 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none'>
                              <button
                              onClick={() => handleActionButton(data,item)}
                              className="text-nowrap"
                              >
                              Agregar a {item.name}
                              </button>
                              <button 
                                onClick={() => handleUpdateFavorite(item)}
                                className='absolute p-1 flex items-center justify-center right-1 top-1/2 transform -translate-y-1/2'
                              >
                              </button>
                            </div>
                        </MenuItem>
                    )
            })}
        </div>
      </MenuItems>
    </Menu>
  )
}
