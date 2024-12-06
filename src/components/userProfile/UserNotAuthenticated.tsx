import { useFridgeContext } from "../../context/fridge-color-context";
import { Link, useNavigate } from "react-router-dom";

export default function UserNotAuthenticated() {
  const { currentColor } = useFridgeContext();
  const navigate = useNavigate()
  return (
    <div className="w-full h-full flex flex-col overflow-y-scroll items-center no-scrollbar px-4 pt-8 sm:pt-16">
      <img src="/turefri-logo.png" className="w-56 pb-8" style={{ aspectRatio: '55/20'}} />
      
      {/* to Login */}
      <div className="my-4 w-[90%]">
        <p
          className="text-md pb-4"
          style={{ color: currentColor.textSecondaryColor }}
        >
          Parece que no estás logueado en la aplicación
        </p>
        <button onClick={() => navigate('/auth/login')} className="w-full py-2 rounded-md text-white bg-blue-500 font-medium">
            Ingresa aquí
          </button>
      </div>
    
      <div className="relative my-4 w-[90%] border border-gray-300 mt-4" />
      
      {/* Register link */}
      <p
        className="text-sm"
        style={{ color: currentColor.textSecondaryColor }}
      >
        ¿No tienes una cuenta?{" "}
        <Link to='/auth/signup' className="text-blue-500 font-medium">Regístrate</Link>
      </p>
      
    </div>
  );
}
