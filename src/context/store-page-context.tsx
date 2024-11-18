import { useState, createContext, useContext, ReactNode } from 'react';
import { MagnetRefriProps, Category } from '../types';

interface StorePageContextType {
    selectedCategory: Category | '';
    handleSelectCategory: (category: Category | '') => void;
    isOpen: boolean;
    handleOpen: (data: MagnetRefriProps) => void,
    handleClose: () => void,
    data: MagnetRefriProps | null
    
}

const StorePageContext = createContext<StorePageContextType | undefined>(undefined);

export const StorePageProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');
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

    return (
        <StorePageContext.Provider value={{ isOpen, data, handleOpen, handleClose, handleSelectCategory, selectedCategory}}>
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
