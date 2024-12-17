import React, { useEffect, useState } from "react";
import { useFridgeContext } from "../../context/fridge-color-context";
import { UserData } from "../../types";
import { updateUserOnDB } from "../../functions/mutations_grapql";
import { toast } from "sonner";
import useUserInfoDB from "../../hooks/useGetUserInfoDB";
import ListMagnetGroupsUserProfile from "./ListMagnetGroupsUserProfile";
import { uploadImage } from "../../functions/s3";
import { getUrl } from "aws-amplify/storage";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileModal from "./UserProfileModal";
import UserProfileForm from "./UserProfileForm";
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
  const [ loadingUpdateAvatar,setLoadingUpdateAvatar] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const avatarInputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user) {
      setForm(user);
      loadAvatarImage(user?.avatar);
    }
  }, [user]);

const loadAvatarImage = async (avatarPath: string | undefined) => {
    const icon = "/images/profile/profile_image.webp";
    console.log(avatarPath)
    const avatarUrl = (avatarPath !== "" && avatarPath) ? avatarPath : icon;
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
  const handleUpdateImage = async (type: string) => {
    setLoadingUpdateAvatar(true);
    if (!selectedImage || !user?.id) return;
    try {
      const path = `public/users/${user?.id}/${type}/${selectedImage.name}`;
      await uploadImage(selectedImage, path);
      const result = await updateUserOnDB({
        id: user?.id,
        avatar: path,
      });
      if (result.status === STATUS.SUCCESS) {
        handleModalClose();
        await refetch(); // Refrescar datos del usuario
        toast.success("¡Buen avatar!", {
          duration: 1200,
          position: "top-center",
        });
      } else {
        toast.error("Error al actualizar el avatar", {
          duration: 1200,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error al actualizar el avatar", error);
    } finally {
      setLoadingUpdateAvatar(false);
    }
  };
  
  const cancelUpdateProfile = () => {
    setForm(user || initialForm);
    setEditProfile(false);
  };
  return (
    <div className="w-full">
      <UserProfileHeader 
        avatarUrl={avatarUrl}
        loadingUserData={loadingUserData}
        editProfile={editProfile}
        setEditProfile={setEditProfile}
        handleImageChange={handleImageChange}
        avatarInputRef={avatarInputRef}/>
      {/* Modal para mostrar la imagen seleccionada */}
      <UserProfileModal
        previewImage={previewImage}
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        handleUpdateImage={handleUpdateImage}
        loadingUpdateAvatar={loadingUpdateAvatar} />
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
        <UserProfileForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelUpdateProfile={cancelUpdateProfile}
          loading={loading}
        />
        }
      </article>
    </div>
  );
}
