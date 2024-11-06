import { useState } from "react";
import { toast } from "sonner";
const initialForm = {
  email: '',
  name: '',
  subject: '',
  message: '',
}
export default function Contact() {
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
    
        setTimeout(() => {
            setLoading(false);
            toast.success('¡Envío exitoso! Gracias por comunicarte con nosotros.');
        }, 2000);
    };
  return (
    <div className='w-full px-6 pt-12'>
      <section>
        <h1 className="text-2xl font-medium">¿En qué podemos ayudarte?</h1>
      </section>
      <section className="pt-6">
      <form onSubmit={handleSubmit} className='flex flex-col'>
                    <label className='text-lg text-gray-600'>Correo</label>
                    <input 
                        type='email' 
                        name='email'
                        placeholder='Tu dirección de correo'
                        value={form.email} 
                        onChange={handleChange} 
                        className='border-2 rounded-md px-3 py-3 shadow-sm mb-5 text-md' 
                    />
                    <label className='text-lg text-gray-600'>Nombre y apellido</label>
                    <input 
                        type='text' 
                        name='name' 
                        placeholder='Tu nombre'
                        value={form.name} 
                        onChange={handleChange} 
                        className='border-2 rounded-md px-3 py-3 shadow-sm mb-5 text-md' 
                    />
                    <label className='text-lg text-gray-600'>Asunto</label>
                    <input 
                        type='text' 
                        name='subject'
                        placeholder='Título del mensaje'
                        value={form.subject} 
                        onChange={handleChange} 
                        className='border-2 rounded-md px-3 py-3 shadow-sm mb-5 text-md' 
                    />
                    <label className='text-lg text-gray-600'>Mensaje</label>
                    <textarea 
                        name='message'
                        placeholder='Cuerpo de correo electrónico'
                        value={form.message} 
                        onChange={handleChange} 
                        className='border-2 rounded-md px-3 py-3 shadow-sm mb-5 text-md' 
                        rows={4} // Puedes ajustar el número de filas según lo que necesites
                    ></textarea>

                   
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
                            "Enviar"
                        }
                    </button>
                </form>
      </section>
    </div>
      
  )
}
