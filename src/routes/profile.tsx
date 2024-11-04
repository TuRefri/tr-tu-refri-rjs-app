import React, { useState, useEffect } from 'react';
import profile from '../../public/images/profile/profile_image.png';
import add from '../../public/icons/add-icon.svg';
import add_button from '../../public/icons/add.svg';
import ModalCreateStore from '../components/ModalCreateStore';
import { MagnetRefriProps } from '../types';
import CardStoreUserProfile from '../components/CardStoreUserProfile';

export default function Profile() {
  const [createStoreModal, setCreateStoreModal] = useState(false);
  const [userStores, setUserStores] = useState<MagnetRefriProps[]>([]);

  const handleCloseCreateStoreModal = () => {
    setCreateStoreModal(false);
    const storedStores = sessionStorage.getItem("user_stores");
    setUserStores(storedStores ? JSON.parse(storedStores) : []);
  };

  useEffect(() => {
    const storedStores = sessionStorage.getItem("user_stores");
    setUserStores(storedStores ? JSON.parse(storedStores) : []);
  }, []);

  const handleStoreDelete = (id: number) => {
    const updatedStores = userStores.filter(store => store.id !== id);
    setUserStores(updatedStores);
    sessionStorage.setItem("user_stores", JSON.stringify(updatedStores));
  };
  return (
    <div className='w-full'>
      <header className='w-full'>
        <div className="relative flex items-center justify-center w-full h-36 bg-gray-300 rounded-t-md dark:bg-gray-300">
          <svg className="w-10 h-10 text-gray-200 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
          </svg>
          <div className='absolute -bottom-[34px] left-3 p-1 bg-[#f2f2f2] rounded-full'>
            <img src={profile} alt='profile image' width={60} />
          </div>
        </div>
      </header>
      <article className='w-full px-6 pt-9'>
        <section className='flex w-full items-start justify-between'>
          <div>
            <h1 className='text-base font-semibold text-gray-700'>Usuario 1</h1>
            <h4 className='text-xs text-gray-700'>@loow3</h4>
          </div>
        </section>

        <div className='my-3 border border-gray-300' />
        {/* Tus tiendas */}
        <section className='flex flex-col w-full'>
          <header className='flex justify-between items-end'>
            <h2 className='text-lg font-medium text-gray-700'>Tus tiendas</h2>
            <button
              onClick={() => setCreateStoreModal(!createStoreModal)} 
              className='py-1 px-4 rounded-md text-white bg-green-700 text-xs font-medium active:bg-green-800'>
              Crear tienda
            </button>
          </header>
          {userStores.length === 0 ? (
            <p className='w-full text-center py-10 text-gray-400'>Aún no creaste ninguna tienda</p>
          ) : (
            <ul className='mt-4'>
              {userStores.map(store => (
                <li key={store.id}>
                  <CardStoreUserProfile 
                    handleStoreDelete={handleStoreDelete}
                    store={store}/>
                </li>
              ))}
            </ul>
          )}
        </section>
      </article>
      {createStoreModal && (
        <div className="absolute inset-0 flex items-end justify-center z-20 ">
          <ModalCreateStore 
            handleCloseCreateStoreModal={handleCloseCreateStoreModal} />
        </div>
      )}
    </div>
  );
}
