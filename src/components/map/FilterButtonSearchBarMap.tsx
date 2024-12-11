import { useRef, useState, useEffect, /* useMemo */ } from 'react';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../../context/global-context';
import useListCategories from '../../hooks/userListCategories';
const ranges : Record<'1' | '2' | '3' | '4', number>= {
    1: 500,
    2: 1000,
    3: 2000,
    4: 5000
}
export default function FilterButtonSearchbarMap() {
    const { categories } = useListCategories()
    const { handleRadius, handleTime, selectedTime, handleSelectCategory, selectedCategory} = useGlobalContext()
    const [open, setOpen] = useState(false);
    const [rangeValue, setRangeValue] = useState('1');
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const divRef = useRef<HTMLDivElement | null>(null);
    const buttonFilterRef = useRef<HTMLButtonElement | null>(null)
    /* const categoriesShown = useMemo(() =>{
        return categories
    },[categories]) */
    const handleSelectRange = (value: '1' | '2' | '3' | '4') => {
        setRangeValue(value)
        handleRadius(ranges[value])
    }
    const handleClickOutside = (event: MouseEvent) => {
        if (divRef.current && !divRef.current.contains(event.target as Node) && !buttonFilterRef.current?.contains(event.target as Node)) {
            setOpen(false);
        }
    };
    useEffect(() => {
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    return (
        <div className='relative'>
            <button
                ref={buttonFilterRef}
                onClick={() => setOpen(!open)}
                className='bg-white p-2 shadow-lg h-full w-auto rounded-full active:bg-gray-100 active:border-black active:scale-95'
            >
                <img src={'/icons/filter.svg'} alt='filter' height={25} width={25} />
            </button>

            {selectedCategory && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.1, ease: 'easeOut' }}
                    className='absolute -top-1 -right-1 rounded-full h-3 w-3 bg-blue-500'
                />
            )}

{open && (
    <motion.div
        initial={{ scaleX: 0, scaleY: 0, y: -10, transformOrigin: 'right top' }}
        animate={{
            scaleX: 1,
            scaleY: 1,
            y: buttonRef.current ? buttonRef.current.offsetHeight + 5 : 0, // Añade espacio para no superponerse al botón
            transformOrigin: 'right top',
        }}
        exit={{ scaleX: 0, scaleY: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="shadow-md z-30 absolute right-0 mt-1 h-fit rounded-md bg-gray-50 p-3 flex flex-col items-center"
        ref={divRef}
    >
        <h2 className='text-gray-500 text-xs text-start w-full'>Categorías</h2>
        <ul className='flex flex-wrap overflow-hidden gap-x-1'>
            {categories.map(item => (
                item.id !== '16' && (
                    <li onClick={() => handleSelectCategory(item)} key={item.id} 
                        className={`cursor-pointer py-1 px-3 ${selectedCategory !== '' && item.id === selectedCategory.id ? "bg-blue-300 text-blue-600" : "bg-gray-200 text-gray-600"} flex items-center rounded-sm text-[10px]  font-medium mt-1 whitespace-nowrap`}>
                        {item.name}
                    </li>
                )
            ))}
        </ul>
        <h2 className='pt-2 text-gray-500 text-xs text-start w-full'>Distancia</h2>
        <div className="relative mb-6 w-[90%]">
            <label htmlFor="labels-range-input" className="sr-only">Labels range</label>
            <input
                id="labels-range-input"
                type="range"
                value={rangeValue}
                min="1"
                max="4"
                step={1}
                onChange={(e) => handleSelectRange(e.target.value as '1' | '2' | '3' | '4')}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between absolute w-full -bottom-4">
                <span className={`${rangeValue === "1"? "text-blue-500" : "text-gray-500"} text-xs`}>1km</span>
                <span className={`${rangeValue === "2"? "text-blue-500" : "text-gray-500"} text-xs`}>2km</span>
                <span className={`${rangeValue === "3"? "text-blue-500" : "text-gray-500"} text-xs`}>5km</span>
                <span className={`${rangeValue === "4"? "text-blue-500" : "text-gray-500"} text-xs`}>10km</span>
            </div>
        </div>

        <h2 className='pt-2 text-gray-500 text-xs text-start w-full'>Horario</h2>
        <div className='w-full flex gap-x-1'>
            <button onClick={() => handleTime("now")} className={`cursor-pointer py-1 px-3 ${"now" === selectedTime ? "bg-blue-300 text-blue-600" : "bg-gray-200 text-gray-600"} flex items-center rounded-sm text-[10px]  font-medium mt-1 whitespace-nowrap`}>
                Abierto ahora
            </button>
            <button onClick={() => handleTime("today")} className={`cursor-pointer py-1 px-3 ${"today" === selectedTime ? "bg-blue-300 text-blue-600" : "bg-gray-200 text-gray-600"} flex items-center rounded-sm text-[10px]  font-medium mt-1 whitespace-nowrap`}>
                Abierto hoy
            </button>
        </div>
    </motion.div>
)}



        </div>
    );
}
