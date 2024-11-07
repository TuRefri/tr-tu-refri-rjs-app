import { useState } from 'react';
import { motion } from 'framer-motion';
import categories from '../data/list-categories.json'
import { toast } from 'sonner';
interface ModalCreateStoreProps {
    handleCloseCreateStoreModal: () => void;
}
const initialForm = {
    id: 0,
    name: '',
    description: '',
    phone: '',
    address: '',
    category: '',
    schedule: {
        "lunes": "7:00 AM - 8:00 PM",
        "martes": "7:00 AM - 8:00 PM",
        "miércoles": "7:00 AM - 8:00 PM",
        "jueves": "7:00 AM - 8:00 PM",
        "viernes": "7:00 AM - 9:00 PM",
        "sábado": "8:00 AM - 9:00 PM",
        "domingo": "8:00 AM - 7:00 PM"
    },
    image: "default-store-logo.webp",
}
export default function ModalCreateStore({ handleCloseCreateStoreModal }: ModalCreateStoreProps) {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        form.id = Math.floor(Math.random() * 4000) + 1;

        const storedStores = sessionStorage.getItem("user_stores");
        let userStores = storedStores ? JSON.parse(storedStores) : [];
    
        userStores.push(form);
        sessionStorage.setItem("user_stores", JSON.stringify(userStores));
    
        setTimeout(() => {
            setLoading(false);
            toast.success('¡Creación exitosa!');
            handleCloseCreateStoreModal()
        }, 2000);
    };
    const handleCancelForm = () =>{
        setForm(initialForm)
        handleCloseCreateStoreModal()
    }
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }} 
            transition={{ duration: 0.3, ease: "easeOut" }} 
            className='overflow-y-scroll no-scrollbar py-12 px-8 z-30 cursor-pointer relative w-full h-full flex flex-col items-center rounded-2xl shadow-md bg-[#fdfcfc]'
        >
            <button className="absolute top-4 right-4 rounded-[50px] h-8 w-8 p-1 flex justify-center items-center bg-white shadow-md active:shadow-[inset_-1px_1px_5px_#cccccc,inset_1px_-1px_5px_#f9f9f9] transition-transform duration-150" onClick={handleCloseCreateStoreModal}>
                <img src={'/icons/close.svg'} alt='close' />
            </button>
            <section className='flex flex-col justify-start w-full'>
                <h2 className='text-2xl text-gray-700 mb-4'>Nueva tienda</h2>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <label className='text-md text-gray-600'>Nombre</label>
                    <input 
                        type='text' 
                        name='name'
                        placeholder='Nombre de tu tienda'
                        value={form.name} 
                        onChange={handleChange} 
                        className='border-2 rounded-md px-2 py-2 shadow-sm mb-5 text-sm' 
                    />

                    <label className='text-md text-gray-600'>Categoría</label>
                    <select 
                        name='category' 
                        value={form.category} 
                        onChange={handleChange} 
                        className='bg-white border-2 rounded-md px-2 py-2 shadow-sm mb-5 text-sm'
                    >
                        <option value="">Selecciona una categoría</option>
                        {categories.map(item =>{
                            if(item.id !==16){
                                return(
                                    <option key={item.id} value={item.name}>{item.name}</option>
                                )
                            }
                        })}
                    </select>

                    <label className='text-md text-gray-600'>Descripción</label>
                    <textarea 
                        name='description'
                        placeholder='Breve descripción de tu tienda'
                        value={form.description} 
                        onChange={handleChange} 
                        className='border-2 rounded-md px-2 py-2 shadow-sm mb-5 text-sm' 
                        rows={4} // Puedes ajustar el número de filas según lo que necesites
                    ></textarea>

                    <label className='text-md text-gray-600'>Teléfono de contacto del establecimiento</label>
                    <input 
                        type='number' 
                        name='phone'
                        placeholder='212-456-7890'
                        value={form.phone} 
                        onChange={handleChange} 
                        className='border-2 rounded-md px-2 py-2 shadow-sm mb-5 text-sm' 
                    />

                    <label className='text-md text-gray-600'>Dirección del establecimiento</label>
                    <input 
                        type='text' 
                        name='address' 
                        placeholder='Calle 100 # 10-10, Bogotá, Colombia'
                        value={form.address} 
                        onChange={handleChange} 
                        className='border-2 rounded-md px-2 py-2 shadow-sm mb-5 text-sm' 
                    />
                    <p className='text-gray-300 mb-3'>Falta horarios, imágenes, etc...</p>
                    <button type="submit" className='py-2 border rounded-md bg-green-600 text-white font-medium active:bg-green-700'>
                        {loading?
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-4 h-4 text-green-600 animate-spin dark:text-green-600 fill-gray-100 dark:fill-gray-100" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>    
                            :
                            "Crear tienda"
                        }
                    </button>
                    <button type="submit" 
                        onClick={handleCancelForm}
                        className='mt-2 text-red-600'>Cancelar</button>
                </form>
            </section>
        </motion.div>
    );
}
