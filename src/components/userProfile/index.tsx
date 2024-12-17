import React, { useEffect, useState } from "react";
import { useFridgeContext } from "../../context/fridge-color-context";
import { UserData } from "../../types";
import { updateUserOnDB } from "../../functions/mutations_grapql";
import { toast } from "sonner";
import useUserInfoDB from "../../hooks/useGetUserInfoDB";
import ListMagnetGroupsUserProfile from "./ListMagnetGroupsUserProfile";
import { uploadImage } from "../../functions/s3";
import { getUrl } from "aws-amplify/storage";
export enum STATUS {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}
const initialForm = {
  id: "",
  email: "",
  username: "",
  name: "",
  birthday:  "",
};

export default function UserProfile() {
  const { currentColor } = useFridgeContext();
  const { user, refetch, loadingUserData } = useUserInfoDB();
  console.log(user, 'user')
  const [editProfile, setEditProfile] = useState(false);
  const [form, setForm] = useState<UserData>(user || initialForm);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Estado del modal
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // Imagen seleccionada
  const [previewImage, setPreviewImage] = useState<string>(""); // URL de la imagen para vista previa
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const avatarInputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user) {
      setForm(user);
      loadAvatarImage(user?.avatar);
    }
  }, [user]);

const loadAvatarImage = async (avatarPath: string | undefined) => {
    const icon = "/icons/edit_user_avatar.svg";
    const avatarUrl = avatarPath !== "" ? avatarPath : icon;
    if (avatarUrl === icon) {
      setAvatarUrl(icon);
    } else {
      // Obtener la URL usando getUrl
      //@ts-ignore
      const { url } = await getUrl({ path: avatarUrl });
      setAvatarUrl(url instanceof URL ? url.href : url);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Generar vista previa de la imagen
      setModalOpen(true); // Abrir modal
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedImage(null);
    setPreviewImage("");
    if (avatarInputRef.current) {
      avatarInputRef.current.value = ""; // Resetear el input de archivo
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await updateUserOnDB(form);
      if (result.status === STATUS.SUCCESS) {
        refetch();
        toast.success(result.msg, { duration: 2000, position: "top-center" });
      } else {
        toast.error(result.msg, { duration: 2000, position: "top-center" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al modificar el usuario.", {
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
      setEditProfile(false); // Salir del modo de edición
    }
  };
  const handleUpdateImage = async(type: string) =>{
    if(!selectedImage || !user?.id) return
    console.log(selectedImage)
    try {
      const path = `public/users/${user?.id}/${type}/${selectedImage.name}`
      await uploadImage(selectedImage, path)
      let result = await updateUserOnDB({
        id: user?.id,
        avatar: path
      })
      if(result.status === STATUS.SUCCESS){
        handleModalClose()

        loadAvatarImage(`${path}`)
        toast.success('¡Buen avatar!', {
          duration: 1200,
          position: 'top-center'
        })
      }else{
        toast.error('Error al actualizar el avatar', {
          duration: 1200,
          position: 'top-center'
        })
      }
    } catch (error) {
      
    }
  }
  const cancelUpdateProfile = () => {
    setForm(user || initialForm);
    setEditProfile(false);
  };
/*   const avatarImage = async () => {
    const icon = "/icons/edit_user_avatar.svg";
    const avatarPath =
      avatar !== ""
        ? avatar
        : user?.avatar
        ? `${user?.avatar}`
        : icon;
  
    if (avatarPath === icon) return icon;
  
    // Obtener la URL usando getUrl
    //@ts-ignore
    const { url } = await getUrl({ path: avatarPath });
  
    // Convertir URL a string explícitamente (si es necesario)
    return url instanceof URL ? url.href : url;
  }; */
  return (
    <div className="w-full">
      <header className='w-full'>
        <div className="relative flex items-center justify-center w-full h-36 bg-gray-300 rounded-t-md dark:bg-gray-300">
          <svg className="w-10 h-10 text-gray-200 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
          </svg>
          <div className='z-10 absolute -bottom-[34px] left-4 p-1 bg-[#f2f2f2] rounded-full h-20 w-20 overflow-hidden'>
          {editProfile ? (
              <div 
              className="w-full h-full rounded-full"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  id="avatarInput"
                  ref={avatarInputRef}
                />
                <label
                  htmlFor="avatarInput"
                  className="relative w-[60px] h-[60px] cursor-pointer"
                >
                  <div className="absolute bg-black opacity-50 w-full h-full flex justify-center items-center rounded-full">
                    <img
                      src={"/icons/edit_user_avatar.svg" }
                      alt="edit user"
                    />
                  </div>
                  <img
                      src={avatarUrl}
                      className="w-full h-full rounded-full"

                      alt="edit user"
                    />
                </label>
              </div>
            ) : (
              loadingUserData?
              <div className="animate-pulse w-full h-full rounded-full bg-gray-300"/>
              :
              <img
                src={avatarUrl}
                className="w-full h-full rounded-full"
                alt="profile image"
              />
            )}
          </div>
          {!editProfile && <button onClick={() => {setEditProfile(true)}} className='absolute top-6 right-4 bg-gray-400 px-3 py-1 text-xs text-white rounded-md active:bg-gray-500'>Editar perfil</button>}
          {/* {editProfile && <div className='absolute cursor-pointer bg-black opacity-50 w-full h-full flex justify-center items-center'><RiImageEditLine className='text-3xl text-white'/> </div>} */}
        </div>
      </header>
      {/* Modal para mostrar la imagen seleccionada */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">Vista previa del avatar</h2>
            <img
              src={previewImage}
              alt="Vista previa"
              className="w-40 h-40 object-cover rounded-full mx-auto"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleModalClose}
                className="py-2 px-4 bg-gray-300 rounded-md text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleUpdateImage('hola')}
                className="ml-2 py-2 px-4 bg-blue-600 rounded-md text-white"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      <article className="w-full px-6 pt-9">
        {!editProfile ? 
        <>
        <section className="flex w-full items-start justify-between">
          {!loadingUserData? 
          <div>
<h1
  className="text-xl font-semibold truncate"
  style={{ color: currentColor.textPrimaryColor }}
>
  {((user?.name || user?.username) && (user?.name || user?.username)?.length > 25
    ? `${(user?.name || user?.username).substring(0, 20)}...`
    : user?.name || user?.username) || ""}
</h1>

            <h4
              className="text-xs"
              style={{ color: currentColor.textSecondaryColor }}
            >
              @{user?.username}
            </h4>
          </div>
          : 
          <div className="w-[60%]">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-3 py-1">
                <div className="h-4 bg-slate-300 rounded"></div>
                <div className="h-3 bg-slate-300 rounded"></div>
              </div>
            </div>
          </div>
          }
        </section>

        <div className="my-3 border" style={{ color: currentColor.border }} />
        <ListMagnetGroupsUserProfile />
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
              disabled
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
