import React, { useState, createContext, useContext, ReactNode } from 'react';
import colorFridge from '../data/colors-fridge.json';

interface Color {
    name: string;
    hexColor: string;
    shadow: string;
}

interface FridgeContextType {
    currentColor: Color;
    setCurrentColor: React.Dispatch<React.SetStateAction<Color>>;
}

const FridgeContext = createContext<FridgeContextType | undefined>(undefined);

export const FridgeProvider = ({ children }: { children: ReactNode }) => {
    const [currentColor, setCurrentColor] = useState<Color>(colorFridge[0]);

    return (
        <FridgeContext.Provider value={{ currentColor, setCurrentColor }}>
            {children}
        </FridgeContext.Provider>
    );
};

export const useFridgeContext = (): FridgeContextType => {
    const context = useContext(FridgeContext);
    if (context === undefined) {
        throw new Error('useFridgeContext must be used within a FridgeProvider');
    }
    return context;
};
