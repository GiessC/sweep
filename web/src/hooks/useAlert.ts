import { AlertContext } from '@/context/AlertContext';
import { useContext } from 'react';

export const useAlert = () => {
    const context = useContext(AlertContext);
    return context;
};
