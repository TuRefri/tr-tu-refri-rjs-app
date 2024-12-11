import { useState } from "react";
import { confirmSignUpUser } from "../../functions/auth";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "sonner";

enum STATUS {
    SUCCESS = 'SUCCESS',
    FAIL = 'FAIL',
  }
const initialForm = {confirmationCode: "" };
const initialErrors = { confirmationCode: "" };

export default function ConfirmCode() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const { username, codeDeliveryDetails } = location.state || {};
  const validateForm = () => {
    const newErrors = { ...initialErrors };
    if (!form.confirmationCode) newErrors.confirmationCode = "El código de confirmación es obligatorio.";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Limpiar error al escribir
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;
    try {
      setLoading(true);
      const result = await confirmSignUpUser({username: username, confirmationCode: form.confirmationCode})
      if(result.status === STATUS.SUCCESS && result.isSignUpComplete){
        navigate('/auth/login')
      } else{
        toast.error(result.msg, {duration: 2000,  position: 'top-center'})
      }
    } catch (error) {
      console.error(error)  
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="w-full h-full flex flex-col overflow-y-scroll items-center no-scrollbar px-4 pt-8 sm:pt-16">
      <img src="/turefri-logo.png" className="w-56 pb-8" style={{ aspectRatio: '55/20'}}/>
        <section className="w-[90%] rounded-lg  px-4 py-6 bg-green-200 text-green-700 text-sm mb-4">
            <p className="pb-1">Enviamos el código de verificación al correo: <span className="font-semibold">{codeDeliveryDetails.codeDeliveryDetails.destination}</span></p>
            <p>Por favor, revisa tu correo y completa el formulario para finalizar el registro.</p>
        </section>
      <form onSubmit={handleSubmit} className="flex flex-col w-[90%] pb-3">
        <input
          type="text"
          name="username"
          disabled
          placeholder="Nombre de usuario"
          value={username}
          onChange={handleChange}
          className={`border-2 rounded-md px-3 py-3 shadow-sm text-sm mb-2`}
        />

        <input
          type="text"
          name="confirmationCode"
          placeholder="Código de confirmación"
          value={form.confirmationCode}
          onChange={handleChange}
          className={`border-2 rounded-md px-3 py-3 shadow-sm text-sm ${errors.confirmationCode ? "border-red-500" : 'mb-2'}`}
        />
        {errors.confirmationCode && <p className="text-red-500 text-sm">{errors.confirmationCode}</p>}

        <button
          type="submit"
          className="py-2 border border-blue-500 rounded-md bg-blue-500 text-white font-medium active:bg-blue-600 shadow-sm"
        >
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-4 h-4 text-blue-500 animate-spin dark:text-blue-500 fill-gray-100 dark:fill-gray-100"
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
          ) : (
            "Confirmar código"
          )}
        </button>
      </form>
    </div>
  );
}
