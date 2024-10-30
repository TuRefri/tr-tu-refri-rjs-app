import React from 'react';
import search from '../../public/icons/search.svg';
import filter from '../../public/icons/filter.svg';
import close from '../../public/icons/close.svg'
import './SearchBarStores.css';
import { useGlobalContext } from '../context/global-context';
import { motion } from 'framer-motion';
interface SearchBarStoresProps {
  searchWords: string;
  setSearchWords: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBarStores({ searchWords, setSearchWords }: SearchBarStoresProps) {
  const { selectedCategory, handleSelectCategory} = useGlobalContext()
  return (
    <nav className='w-full flex flex-col gap-x-2'>
      <div className='w-full flex gap-x-2'>
      <div className='relative'>
        <input
          type='text'
          placeholder='Buscar tienda'
          value={searchWords} // Establece el valor del input
          onChange={(e) => setSearchWords(e.target.value)} // Actualiza el estado al cambiar el input
          className='search-bar-css w-full py-2 px-6 rounded-lg pr-10'
        />
        <img src={search} alt='search' height={25} width={25} className='absolute right-3 top-1/2 transform -translate-y-1/2' />
      </div>
      <button className='search-bar-css px-2 h-full rounded-lg'>
        <img src={filter} alt='filter' height={30} width={30} />
      </button>
      </div>
      {selectedCategory !== '' &&
        <button onClick={() =>{handleSelectCategory('')}} className='py-1 px-3 bg-gray-200 flex items-center rounded-md text-xs text-gray-600 font-medium w-fit mt-1'>
          {selectedCategory}
          <img src={close} height={12} width={12} className='ml-2'/>
        </button>
      }
    </nav>
  );
}
