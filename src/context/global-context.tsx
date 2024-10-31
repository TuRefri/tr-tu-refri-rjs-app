import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import { Category, MagnetRefriProps, Open } from '../types';
import { toast } from 'sonner';
import { addMagnetToSStorage, removeMagnetFromSStorage } from '../utils/addTuRefriMagnets';

interface GlobalContextType {
    magnets: MagnetRefriProps[]; // Añadido para almacenar los imanes
    addMagnet: number; // Mantener el estado existente
    selectedCategory: Category | '';
    zone: number;
    selectedTime: Open;
    handleSelectCategory: (category: Category | '') => void;
    handleAddMagnet: (data: MagnetRefriProps) => void;
    handleRemoveMagnet: (id: number | undefined) => void;
    handleZone: (value: number) => void;
    handleTime: (value: Open) => void;

}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCategory, setSelectedCategory] = useState<Category | ''>('')
    const [zone, setZone] = useState(5000);
    const [selectedTime, setSelectedTime] = useState<Open>(null)
    const [magnets, setMagnets] = useState<MagnetRefriProps[]>(() => {
        const savedMagnets = sessionStorage.getItem('magnets');
        return savedMagnets ? JSON.parse(savedMagnets) : [];
    });

    const [addMagnet, setAddMagnet] = useState(0);

    const handleAddMagnet = (data: MagnetRefriProps) => {
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
                const updatedMagnets = magnets.filter(magnet => magnet.id !== id); // Filtrar por id
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
        if(category !== '' && selectedCategory !== '' && category.id === selectedCategory.id){
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
    return (
        <GlobalContext.Provider value={{ magnets, addMagnet, handleAddMagnet, handleRemoveMagnet, handleSelectCategory, selectedCategory, zone, handleZone, handleTime, selectedTime }}>
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
