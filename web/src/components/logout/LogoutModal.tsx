'use client';

import Modal from '@/components/common/Modal/Modal';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export interface LogoutModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const LogoutModal = ({ isOpen, setIsOpen }: LogoutModalProps) => {
    const [loggingOut, setLoggingOut] = useState<boolean>(false);
    const { push } = useRouter();

    const logout = () => {
        setLoggingOut(true);
        push('/auth/logout');
    };

    return (
        <Modal
            title='Logout?'
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            confirmButtonText='Logout'
            styles={{
                confirmButton:
                    'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300',
                cancelButton:
                    'bg-gray-300 text-black hover:bg-gray-400 disabled:bg-gray-100',
            }}
            onConfirm={logout}
            cancelDisabled={loggingOut}
            confirmDisabled={loggingOut}
        >
            <Typography>Are you sure you want to logout?</Typography>
        </Modal>
    );
};

export default LogoutModal;
