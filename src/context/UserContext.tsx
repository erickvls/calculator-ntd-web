'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
    balance: string;
    setBalance: (balance: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [balance, setBalance] = useState<string>('0.00');

    return (
        <UserContext.Provider value={{ balance, setBalance }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
