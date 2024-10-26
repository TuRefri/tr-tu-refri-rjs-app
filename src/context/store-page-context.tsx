import React, { useState, createContext, useContext, ReactNode } from 'react';
import { MagnetRefriProps } from '../types';

interface StorePageContextType {
    zone: number,
    filterCategory: string
    setFilterCategory: React.Dispatch<React.SetStateAction<string>>;
    setZone: React.Dispatch<React.SetStateAction<number>>;
    isOpen: boolean;
    handleOpen: (data: MagnetRefriProps) => void,
    handleClose: () => void,
    data: MagnetRefriProps | null
    
}

const StorePageContext = createContext<StorePageContextType | undefined>(undefined);

export const StorePageProvider = ({ children }: { children: ReactNode }) => {
    const [filterCategory, setFilterCategory] = useState('')
    const [zone, setZone] = useState(5000);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [data, setData] = useState<MagnetRefriProps | null>(null)

    const handleOpen = (data : MagnetRefriProps) =>{
        console.log('handleOpen')
        setIsOpen(true)
        setData(data)
        console.log(!isOpen)
        console.log(data)
    }
    const handleClose = () =>{
        console.log('handleClose')
        setIsOpen(false)
        setData(null)
    }

    return (
        <StorePageContext.Provider value={{ isOpen, data, handleOpen, handleClose, zone, setZone, setFilterCategory, filterCategory}}>
            {children}
        </StorePageContext.Provider>
    );
};

export const useStorePageContext = () => {
    const context = useContext(StorePageContext);
    if (context === undefined) {
        throw new Error('StorePageContext must be used within a StorePageProvider');
    }
    return context;
};
