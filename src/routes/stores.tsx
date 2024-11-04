import { useContext, useState, useEffect } from 'react';
import StoreList from '../components/StoreList';
import stores from '../data/stores.json';
import SearchBarStores from '../components/SearchBarStores';
import { useStorePageContext } from '../context/store-page-context';
import ModalStoreCard from '../components/ModalStoreCard';

export default function StorePage() {
  const { isOpen } = useStorePageContext();
  const [searchWords, setSearchWords] = useState('');
  const [userStores, setUserStores] = useState([]);

  useEffect(() => {
    const storedStores = sessionStorage.getItem("user_stores");
    if (storedStores) {
      setUserStores(JSON.parse(storedStores));
    }
  }, []);

  const allStores = [...stores, ...userStores];

  const filterStores = searchWords === ''
    ? allStores
    : allStores.filter(item => item.name.toLowerCase().includes(searchWords.toLowerCase()));
  return (
    <section className='w-full h-full py-10 px-4 flex flex-col items-center'>
      <SearchBarStores setSearchWords={setSearchWords} searchWords={searchWords} />
      <StoreList stores={filterStores} />
      {isOpen && (
        <div className="absolute inset-0 flex items-end justify-center z-20 my-2 ">
          <ModalStoreCard />
        </div>
      )}
    </section>
  );
}
