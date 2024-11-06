;
import './SearchBarStores.css';
import FilterButtonSearchbar from './FilterButtonSearchbar';
interface SearchBarStoresProps {
  searchWords: string;
  setSearchWords: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBarStores({ searchWords, setSearchWords }: SearchBarStoresProps) {
  return (
    <nav className='w-full flex flex-col gap-x-2'>
      <div className='w-full flex gap-x-2'>
        <div className='relative w-full'>
          <input
            type='text'
            placeholder='Buscar tienda'
            value={searchWords} // Establece el valor del input
            onChange={(e) => setSearchWords(e.target.value)} // Actualiza el estado al cambiar el input
            className='bg-gray-50 w-full py-2 px-6 rounded-lg border-2 border-gray-300'
          />
          <img src={'/icons/search.svg'} alt='search' height={25} width={25} className='absolute right-3 top-1/2 transform -translate-y-1/2' />
        </div>
        <FilterButtonSearchbar />
      </div>
     {/*  {selectedCategory !== '' &&
        <button onClick={() =>{handleSelectCategory('')}} className='py-1 px-3 bg-gray-200 flex items-center rounded-md text-xs text-gray-600 font-medium w-fit mt-1'>
          {selectedCategory}
          <img src={close} height={12} width={12} className='ml-2'/>
        </button>
      } */}
    </nav>
  );
}
