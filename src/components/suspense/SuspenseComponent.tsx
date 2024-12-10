export default function SuspenseComponent() {
   return (
     <div className='absolute top-0 left-0 w-full h-full border-3 border-red-500'>
       <div className="w-full h-full bg-slate-100 dark:bg-slate-300 flex items-center justify-center animate-pulse">
         {/* Este div tiene la animación y el fondo, pero no contiene la imagen */}
       </div>
       
       {/* Imagen posicionada fuera del contenedor pero centrada en la pantalla */}
       <img 
         src='/icons/turefri.webp' 
         height={100} 
         width={100} 
         alt='suspense icon' 
         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-none" 
       />
     </div>
   );
 }
 