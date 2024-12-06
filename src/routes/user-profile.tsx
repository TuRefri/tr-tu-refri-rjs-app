import { useEffect, useState } from "react";
import { useFridgeContext } from "../context/fridge-color-context";
import { RiImageEditLine } from "react-icons/ri";
import { useGlobalContext } from "../context/global-context";
const initialForm = {
  email: "ignaciodiaznanni@gmail.com",
  name: "Usuario 1",
  birthday: "1998-12-04",
};

export default function UserProfile() {
  const { currentColor } = useFridgeContext();
  const { userData } = useGlobalContext()
  const [editProfile, setEditProfile] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  useEffect(() =>{
  },[])
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEditProfile(false); // Salir del modo de edición
      console.log("Formulario enviado:", form);
    }, 2000);
  };

  const cancelUpdateProfile = () =>{
    setForm(initialForm)
    setEditProfile(false)
  }
  return (
    <div className="w-full">
      <header className='w-full'>
        <div className="relative flex items-center justify-center w-full h-36 bg-gray-300 rounded-t-md dark:bg-gray-300">
          <svg className="w-10 h-10 text-gray-200 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
          </svg>
          <div className='z-10 absolute -bottom-[34px] left-4 p-1 bg-[#f2f2f2] rounded-full'>
            {editProfile?
            <div className='relative w-[60px] h-[60px] cursor-pointer'>
              <div className='absolute bg-black opacity-50 w-full h-full flex justify-center items-center rounded-full'><RiImageEditLine className='text-2xl text-white'/> </div>
              <img src={'/images/profile/profile_image.webp'} alt='profile image' width={60} />
            </div>
            :
            <img src={'/images/profile/profile_image.webp'} alt='profile image' width={60} />
            }
          </div>
          {!editProfile && <button onClick={() => {setEditProfile(true)}} className='absolute top-6 right-4 bg-gray-400 px-3 py-1 text-xs text-white rounded-md active:bg-gray-500'>Editar perfil</button>}
          {editProfile && <div className='absolute cursor-pointer bg-black opacity-50 w-full h-full flex justify-center items-center'><RiImageEditLine className='text-3xl text-white'/> </div>}
        </div>
      </header>
      <article className="w-full px-6 pt-9">
        {!editProfile ? 
        <>
        <section className="flex w-full items-start justify-between">
          <div>
            <h1
              className="text-lg font-semibold"
              style={{ color: currentColor.textPrimaryColor }}
            >
              {userData?.name || userData?.username }
            </h1>
            <h4
              className="text-xs"
              style={{ color: currentColor.textSecondaryColor }}
            >
              @{userData?.username}
            </h4>
          </div>
        </section>

        <div className="my-3 border" style={{ color: currentColor.border }} />
        </>
        :
        (
          <form onSubmit={handleSubmit} className="flex flex-col pt-4">
            <label className="text-md" style={{ color: currentColor.textSecondaryColor }}>
              Nombre
            </label>
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              value={form.name}
              onChange={handleChange}
              className="border-2 rounded-md px-3 py-2 shadow-sm text-md w-full mb-2"
            />

            <label className="text-md" style={{ color: currentColor.textSecondaryColor }}>
              Correo
            </label>
            <input
              type="email"
              name="email"
              placeholder="Tu correo"
              value={form.email}
              onChange={handleChange}
              className="border-2 rounded-md px-3 py-2 shadow-sm text-md w-full mb-2"
            />

            <label className="text-md" style={{ color: currentColor.textSecondaryColor }}>
              Cumpleaños
            </label>
            <input
              type="date"
              name="birthday"
              value={form.birthday}
              onChange={handleChange}
              className="border-2 rounded-md px-3 py-2 shadow-sm text-md w-full mb-4 bg-white"
            />

            <button
              type="submit"
              className="py-2 border border-green-600 rounded-md bg-green-600 text-white font-medium active:bg-green-700"
            >
              {loading ? 
              <div role="status">
                  <svg aria-hidden="true" className="inline w-4 h-4 text-green-600 animate-spin dark:text-green-600 fill-gray-100 dark:fill-gray-100" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="sr-only">Loading...</span>
              </div> 
              : 
              "Guardar cambios"
              }
            </button>
            <button
              onClick={cancelUpdateProfile}
              className="py-4 text-red-400 font-light"
            >
              Cancelar
            </button>
          </form>
        )}
      </article>
    </div>
  );
}
