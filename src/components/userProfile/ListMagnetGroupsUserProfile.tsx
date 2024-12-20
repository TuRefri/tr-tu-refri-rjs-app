import { useMagnetGroupsContext } from '../../context/magnet-groups';
import { MagnetGroup } from '../../types/magnetGroup'
import { deleteMagnetGroupOndDB, deleteMagnetOnDB } from '../../functions/mutations_grapql'
import { toast } from 'sonner';
import { useState } from 'react';
export default function ListMagnetGroupsUserProfile() {
    const { magnetgroups, refetch } = useMagnetGroupsContext()
    const [deleteOnProgress, setDeleteOnProgress] = useState(false)
    const handleDelete = async (item: MagnetGroup) => {
        setDeleteOnProgress(true)
        console.log(item.id)
        try {
            const deletePromises: Promise<unknown>[] = [
                deleteMagnetGroupOndDB(item.id)
            ];
            item.magnets.items.forEach(magnet => {
                deletePromises.push(deleteMagnetOnDB(magnet.id));
            });
    
            const results = await Promise.allSettled(deletePromises);
    
            const rejectedPromises = results.filter(result => result.status === 'rejected');
            if (rejectedPromises.length > 0) {
                console.error('Algunas operaciones de eliminación fallaron:', rejectedPromises);
            } else{
                toast.success("¡Eliminación exitosa!", {
                    duration: 1200,
                    position: 'top-center'
                })
                refetch()
            }
        } catch (error) {
            console.error('Error al eliminar el grupo o sus magnetos:', error);
        } finally{
            setDeleteOnProgress(false)
        }
    };
    
  return (
    <section className='text-gray-700 w-full flex flex-col items-center'>
        <h2 className='text-lg font-medium w-full mb-1'>Tus Refris</h2>
        <ul className='w-full px-1 flex flex-col gap-y-2'>
            {magnetgroups.map(item =>{
                return(
                    <li 
                        key={item.id}
                        className='flex justify-between py-3 px-2 hover:bg-slate-200 rounded-md text-gray-500 font-medium' 
                    >
                        <p>{item.name}</p>
                        {magnetgroups.length > 1 && <button
                            disabled={deleteOnProgress}
                            onClick={() => handleDelete(item)}
                        >
                            <img src="/icons/trash.svg" alt='delete'/>
                        </button>}
                    </li>
                )
            })}
        </ul>
    </section>
  )
}
