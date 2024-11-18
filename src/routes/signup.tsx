import { useState } from "react";
import { useFridgeContext } from "../context/fridge-color-context";
import { Link } from "react-router-dom";

const initialForm = { username: "", password: "", email: "", confirmPassword: "" };
const initialErrors = { username: "", password: "", email: "", confirmPassword: "" };
const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/; // Al menos 8 caracteres, incluyendo uno numérico

export default function SignUp() {
  const { currentColor } = useFridgeContext();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = { ...initialErrors };

    if (!form.username) newErrors.username = "El nombre de usuario es obligatorio.";
    if (!form.email) newErrors.email = "El correo electrónico es obligatorio.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "El correo electrónico no es válido.";

    if (!form.password) newErrors.password = "La contraseña es obligatoria.";
    else if (!passwordRegex.test(form.password)) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres e incluir un número.";
    }

    if (!form.confirmPassword) newErrors.confirmPassword = "La confirmación de contraseña es obligatoria.";
    else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Limpiar error al escribir
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    // Simular un envío de datos
    setTimeout(() => {
      console.log("Formulario enviado:", form);
      setLoading(false);
      setForm(initialForm);
    }, 2000);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-y-scroll items-center no-scrollbar px-4 pt-8 sm:pt-16">
      <img src="/turefri-logo.png" className="w-56 pb-8" />

      <form onSubmit={handleSubmit} className="flex flex-col w-5/6 pb-3">
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={form.username}
          onChange={handleChange}
          className={`border-2 rounded-md px-3 py-3 shadow-sm text-sm ${errors.username ? "border-red-500" : 'mb-2'}`}
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          className={`border-2 rounded-md px-3 py-3 shadow-sm  text-sm ${errors.email ? "border-red-500" : 'mb-2'}`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className={`border-2 rounded-md px-3 py-3 shadow-sm text-sm ${errors.password ? "border-red-500" : 'mb-2'}`}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={form.confirmPassword}
          onChange={handleChange}
          className={`border-2 rounded-md px-3 py-3 shadow-sm  text-sm ${errors.confirmPassword ? "border-red-500 mb2" : 'mb-5'}`}
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

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
            "Ingresar"
          )}
        </button>
      </form>
      {/* Separador */}
      <div className="relative my-4 w-5/6 border-t-2 border-gray-300 ">
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className="px-4"
            style={{
              backgroundColor: currentColor.hexColor,
              color: currentColor.textSecondaryColor,
            }}
          >
            o
          </p>
        </div>
      </div>
      <section className="w-5/6 flex flex-col gap-y-3 py-4">
        <button className="bg-[#3b5998] flex justify-center w-full py-2 px-3 items-center text-white rounded-md font-medium shadow-sm">
          <img
            src="/icons/social-media/logo-facebook.svg"
            className="h-8 w-8 mr-3"
          />
          <span>Ingresar con Facebook</span>
        </button>
        <button className="bg-white border border-gray-400 flex justify-center w-full py-2 px-3 items-center text-gray-600 rounded-md font-medium shadow-sm">
          <img
            src="/icons/social-media/logo-google-color.svg"
            className="h-8 w-8 mr-3"
          />
          <span>Ingresar con Google</span>
        </button>
      </section>
      <p
        className="text-sm"
        style={{ color: currentColor.textSecondaryColor }}
      >
        ¿Olvidaste tu contraseña?
      </p>
      <div className="relative my-4 w-5/6 border border-gray-300 mt-4" />
      <p
        className="text-sm"
        style={{ color: currentColor.textSecondaryColor }}
      >
        ¿Ya tienes una cuenta?{" "}
        <Link to={'/login'} className="text-blue-500 font-medium">Ingresar</Link >
      </p>
    </div>
  );
}
