import React, { useState, createContext, useContext, ReactNode } from 'react';
import { MagnetRefriProps } from '../types';

interface DetailMagnetContextType {
    isOpen: boolean;
    handleOpen: (data: MagnetRefriProps) => void,
    handleClose: () => void,
    data: MagnetRefriProps | null
}

// Create the context with a default value of the correct type
const DetailMagnetContext = createContext<DetailMagnetContextType | undefined>(undefined);

export const DetailMagnetProvider = ({ children }: { children: ReactNode }) => {
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
        <DetailMagnetContext.Provider value={{ isOpen, data, handleOpen, handleClose }}>
            {children}
        </DetailMagnetContext.Provider>
    );
};

export const useDetailMagnetContext = () => {
    const context = useContext(DetailMagnetContext);
    if (context === undefined) {
        throw new Error('DetailMagnetContext must be used within a DetailMagnetProvider');
    }
    return context;
};
