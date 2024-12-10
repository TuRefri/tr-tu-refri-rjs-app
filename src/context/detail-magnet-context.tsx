import { useState, createContext, useContext, ReactNode } from 'react';
import { MagnetsItem } from '../types/magnetGroup';
interface DetailMagnetContextType {
    isOpen: boolean;
    handleOpen: (data: MagnetsItem) => void,
    handleClose: () => void,
    data: MagnetsItem | null
}

// Create the context with a default value of the correct type
const DetailMagnetContext = createContext<DetailMagnetContextType | undefined>(undefined);

export const DetailMagnetProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [data, setData] = useState<MagnetsItem | null>(null)

    const handleOpen = (data : MagnetsItem) =>{
        setIsOpen(true)
        setData(data)
    }
    const handleClose = () =>{
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
