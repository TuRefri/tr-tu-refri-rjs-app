import { useState, createContext, useContext, ReactNode } from 'react';
import { Category, MagnetRefriProps, Open, UserData } from '../types';
import { toast } from 'sonner';
import { addMagnetToSStorage, removeMagnetFromSStorage } from '../utils/addTuRefriMagnets';

interface GlobalContextType {
    magnets: MagnetRefriProps[]; 
    addMagnet: number; 
    selectedCategory: Category | '';
    zone: number;
    selectedTime: Open;
    sharingPosition: boolean; // Agregado para saber si se está compartiendo la ubicación
    position: { latitude: number; longitude: number } | null; // Para almacenar la posición
    userData: UserData | null;
    handleSelectCategory: (category: Category | '') => void;
    handleAddMagnet: (data: MagnetRefriProps | null) => void;
    handleRemoveMagnet: (id: number | undefined) => void;
    handleZone: (value: number) => void;
    handleTime: (value: Open) => void;
    handleToggleSharePosition: () => void; // Handler para activar/desactivar la compartición de ubicación
    handleUpdatePosition: () => void; // Handler para obtener la posición del usuario
    handleSetStaticPosition: (lat : number,lng : number) => void
    handleSetUserData: (user: UserData) => void
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [sharingPosition, setSharingPosition] = useState(false); // Estado para saber si se está compartiendo la ubicación
    const [position, setPosition] = useState<{ latitude: number; longitude: number } | null>(null); // Estado para la ubicación
    const [userData, setUserData] = useState<UserData | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');
    const [zone, setZone] = useState(5000);
    const [selectedTime, setSelectedTime] = useState<Open>(null);
    const [magnets, setMagnets] = useState<MagnetRefriProps[]>(() => {
        const savedMagnets = sessionStorage.getItem('magnets');
        return savedMagnets ? JSON.parse(savedMagnets) : [];
    });
    const [addMagnet, setAddMagnet] = useState(0);

    const handleAddMagnet = (data: MagnetRefriProps | null) => {
        if(!data) return
        let msg = '';
        const result = addMagnetToSStorage(data);

        if (result.save) {
            const newMagnets = [...magnets, data];
            setMagnets(newMagnets);
            sessionStorage.setItem('magnets', JSON.stringify(newMagnets));
            setAddMagnet(addMagnet + 2);
            msg = 'Tienda agregada a tu refri';
        } else {
            if (result.cause === 'already exists') {
                msg = 'Ya tienes este imán en tu refri';
            } else if (result.cause === 'error') {
                msg = 'Error al agregar a tu refri';
            }
            toast(msg);
        }
    };

    const handleRemoveMagnet = (id?: number) => {
        if (id) {
            let msg = '';
            const result = removeMagnetFromSStorage(id);

            if (result.removed) {
                const updatedMagnets = magnets.filter(magnet => magnet.id !== id); 
                setMagnets(updatedMagnets);
                sessionStorage.setItem('magnets', JSON.stringify(updatedMagnets));
                setAddMagnet(-1);
                msg = 'Tienda eliminada de tu refri';
            } else {
                msg = 'Error al eliminar tienda';
                toast(msg);
            }
        }
    };

    const handleSelectCategory = (category: Category | '') =>{
        if(category !== '' && category.id === 16){
            console.log('entra aqui')
            setSelectedCategory('')
        }
        else if(category !== '' && selectedCategory !== '' && category.id === selectedCategory.id){
            setSelectedCategory('')
        }else{
            setSelectedCategory(category)
        }
    }

    const handleZone = (value : number) =>{
        setZone(value)
    }

    const handleTime = (value : Open) =>{
        if(value === selectedTime){
            setSelectedTime(null)
        }else{
            setSelectedTime(value)
        }
    }

    // Manejador para activar/desactivar la compartición de ubicación
    const handleToggleSharePosition = () => {
        setSharingPosition(prev => !prev);
        if (!sharingPosition) {
            handleUpdatePosition(); // Actualizar posición cuando se activa la compartición
        }else{
            setSharingPosition(false)
            setPosition(null)

        }
    };

    // Manejador para obtener la posición del usuario
    const handleUpdatePosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    toast("Error al obtener la ubicación");
                    console.error(error);
                }
            );
        } else {
            toast("Geolocalización no soportada en este navegador");
        }
    };

    const handleSetStaticPosition = (lat : number,lng : number) =>{
        setPosition({
            latitude: lat,
            longitude: lng,
        });
    }

    const handleSetUserData = ( user: UserData) =>{
        console.log(user, 'handleSetUserData')
        setUserData(user)
    }
    return (
        <GlobalContext.Provider value={{
            magnets, addMagnet, handleAddMagnet, handleRemoveMagnet, handleSelectCategory,
            selectedCategory, zone, handleZone, handleTime, selectedTime, sharingPosition, 
            position, handleToggleSharePosition, handleUpdatePosition, handleSetStaticPosition,
            userData, handleSetUserData
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('GlobalContext must be used within a GlobalProvider');
    }
    return context;
};
