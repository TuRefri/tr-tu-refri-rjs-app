import React from "react";
import { UserData } from "../../types";
import { useFridgeContext } from "../../context/fridge-color-context";
interface UserProfileFormProps {
  form: UserData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  cancelUpdateProfile: () => void;
  loading: boolean;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({
  form,
  handleChange,
  handleSubmit,
  cancelUpdateProfile,
  loading,
}) => {
    const { currentColor } = useFridgeContext();
  return (
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
  );
};

export default UserProfileForm;
