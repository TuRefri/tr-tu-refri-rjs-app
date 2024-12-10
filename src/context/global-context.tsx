import { useState, createContext, useContext, ReactNode, useEffect} from 'react';
import { Open, UserData } from '../types';
import {  Location } from '../types/location';
import { CategoryQuery } from '../types/graphql';
import { toast } from 'sonner';
import { addMagnetToSStorage, removeMagnetFromSStorage } from '../utils/addTuRefriMagnets';
import { MagnetGroup } from '../types/magnetGroup';
import useGetMagnets from '../hooks/useGetMagnets';

interface GlobalContextType {
    magnets: Location[]; 
    addMagnet: number; 
    selectedCategory: CategoryQuery | '';
    radius: number;
    selectedTime: Open;
    sharingPosition: boolean; // Agregado para saber si se está compartiendo la ubicación
    position: { latitude: number; longitude: number } | null; // Para almacenar la posición
    selectedMagnetGroup: MagnetGroup | null,
    handleSelectCategory: (category: CategoryQuery | '') => void;
    handleAddMagnet: (data: Location | null) => void;
    handleRemoveMagnet: (id: number | undefined) => void;
    handleRadius: (value: number) => void;
    handleTime: (value: Open) => void;
    handleToggleSharePosition: () => void; // Handler para activar/desactivar la compartición de ubicación
    handleUpdatePosition: (lat?: number, lng?: number) => void; // Handler para obtener la posición del usuario
    handleSetStaticPosition: (lat : number,lng : number) => void
    handleSetUserData: (user: UserData) => void
    handleSetZone: () => void
    handleGetZone: () => string | null,
    handleSelectMagnetGroup: (magnetGroup : MagnetGroup) => void
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const { magnetgroups } = useGetMagnets()
    const [sharingPosition, setSharingPosition] = useState(false); // Estado para saber si se está compartiendo la ubicación
    const [position, setPosition] = useState<{ latitude: number; longitude: number } | null>(null); // Estado para la ubicación
    const [selectedCategory, setSelectedCategory] = useState<CategoryQuery | ''>('');
    const [radius, setRadius] = useState(1000);
    const [selectedTime, setSelectedTime] = useState<Open>(null);
    const [magnets, setMagnets] = useState<Location[]>(() => {
        const savedMagnets = sessionStorage.getItem('magnets');
        return savedMagnets ? JSON.parse(savedMagnets) : [];
    });
    const [addMagnet, setAddMagnet] = useState(0);
    const [selectedMagnetGroup, setSelectedMagnetGroup] = useState<MagnetGroup | null>(null)
    
    useEffect(() =>{
        if(!selectedMagnetGroup && magnetgroups.length > 0){
          handleSelectMagnetGroup(magnetgroups[0])
        }
      },[magnetgroups])
    const handleAddMagnet = (data: Location | null) => {
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
                //TODO Esto no es un number, es un string
                const updatedMagnets = magnets.filter(magnet => Number(magnet.id) !== id); 
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

    const handleSelectCategory = (category: CategoryQuery | '') =>{
        if(category !== '' && category.id === '16'){
            setSelectedCategory('')
        }
        else if(category !== '' && selectedCategory !== '' && category.id === selectedCategory.id){
            setSelectedCategory('')
        }else{
            setSelectedCategory(category)
        }
    }

    const handleRadius = (value : number) =>{
        setRadius(value)
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
    const handleUpdatePosition = (lat?: number, lng?: number) => {
        if(lat && lng){
            return setPosition({
                    latitude: lat,
                    longitude: lng,
                });
        }
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
        window.localStorage.setItem('aprox_position', JSON.stringify({latitude: lat, longitude: lng}))
    }

    const handleSetUserData = ( user: UserData) =>{
        window.localStorage.setItem('user_data', JSON.stringify(user))
    }
    //TODO zone debe ser determinado por el api creado para ello, como no tenemos suficientes comercios se setea zona = '3' estatico
    const handleSetZone = () =>{
        window.localStorage.setItem('user_zone', '3')
    }
    const handleGetZone = () =>{
        return window.localStorage.getItem('user_zone')
    }
    const handleSelectMagnetGroup = (magnetGroup: MagnetGroup) =>{
        setSelectedMagnetGroup(magnetGroup)
    }
    return (
        <GlobalContext.Provider value={{
            magnets, addMagnet, handleAddMagnet, handleRemoveMagnet, handleSelectCategory,
            selectedCategory, radius, handleRadius, handleTime, selectedTime, sharingPosition, 
            position, handleToggleSharePosition, handleUpdatePosition, handleSetStaticPosition,
            handleSetUserData, handleSetZone, handleGetZone, handleSelectMagnetGroup, selectedMagnetGroup
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
