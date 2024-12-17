import { motion } from 'framer-motion';
import { createMagnetGroupOndDB } from '../functions/mutations_grapql';
import { useState } from 'react';
import { toast } from 'sonner';
interface ModalCreateMagnetGroupProps {
  handleCloseModal: (created: boolean) => void;
}
const initialForm = {
    favorite: false,
    name: ''
}
export default function ModalCreateMagnetGroup({ handleCloseModal }: ModalCreateMagnetGroupProps) {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
          ...form,
          [name]: value,
        });
      };
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
    
        try {
          const result = await createMagnetGroupOndDB(form);
          console.log('Result:', result); // Aquí podrías manejar el resultado, por ejemplo, mostrar un mensaje de éxito
          if(result.status === 'SUCCESS'){
            toast.success('¡Creación exitosa!', {duration: 2000,  position: 'top-center'});
            handleCloseModal(true)
          }
        } catch (error) {
          toast.error('Error al crear el nuevo Refri', {duration: 2000,  position: 'top-center'});
        } finally {
          setLoading(false);
        }
      };
  return (
    <motion.div
      initial={{ scale: 1, y: 400 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative w-full rounded-t-3xl bg-white text-gray-700 min-h-56 px-8 py-10 z-50"
    >

        <div className='w-full flex pb-6'>
            <button className="absolute top-4 right-4 rounded-[50px] h-8 w-8 p-1 flex justify-center items-center bg-white shadow-md active:shadow-[inset_-1px_1px_5px_#cccccc,inset_1px_-1px_5px_#f9f9f9]  transition-transform duration-150" onClick={() => handleCloseModal(false)}>
                <img src={'/icons/close.svg'} alt='close' />
            </button>
            {/* contenido */}
            <section>
                <h2 className='text-2xl font-medium pb-1'>¡Crea tu nuevo Refri!</h2>
            </section>
            {/* contenido */}
        </div> 
      <section>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label htmlFor="refrigeratorName" className="text-sm font-medium text-gray-600">
            Nombre de tu nuevo refri
          </label>
          <input
            id="refrigeratorName"
            name="name"
            type="text"
            placeholder="Ejemplo: Mi refri cool"
            value={form.name}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full border py-2 mt-4 text-sm rounded-md bg-blue-500 text-white font-medium active:bg-blue-600"
          >
            {loading?
            <div role="status">
                <svg aria-hidden="true" className="inline w-4 h-4 text-green-600 animate-spin dark:text-green-600 fill-gray-100 dark:fill-gray-100" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div> 
            :
            "Guardar"
            }
          </button>
        </form>
      </section>
    </motion.div>
  );
}
