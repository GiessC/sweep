'use client';

import Modal from '@/components/common/Modal/Modal';
import { AuthContext } from '@/context/AuthContext';
import { TOO_MANY_REQUESTS, UNKNOWN } from '@/errors/ErrorMessages';
import { isAWSError } from '@/utils/awsUtils';
import { setItem } from '@/utils/localStorage';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

export interface LogoutModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const useAlert = () => {
    return (message: string, type: string) => {
        console.log(message, type);
    };
};

const LogoutModal = ({ isOpen, setIsOpen }: LogoutModalProps) => {
    const router = useRouter();
    const showAlert = useAlert();
    const [loggingOut, setLoggingOut] = useState<boolean>(false);
    const { logout, setIsAuthenticated } = useContext(AuthContext);

    const onLogout = async () => {
        setLoggingOut(true);
        try {
            await logout();
            setItem('isAuthenticated', 'false');
            setIsAuthenticated(false);
            setIsOpen(false);
            router.push('/auth/login');
        } catch (error: unknown) {
            if (isAWSError(error, 'NotAuthorizedException')) {
                setItem('isAuthenticated', 'false');
                setIsAuthenticated(false);
                setIsOpen(false);
                router.push('/auth/login');
            } else if (isAWSError(error, 'TooManyRequestsException')) {
                showAlert(TOO_MANY_REQUESTS(), 'error');
            } else if (error instanceof Error) {
                console.error(error);
                showAlert(error.message, 'error');
            } else {
                console.error(error);
                showAlert(UNKNOWN(), 'error');
            }
        } finally {
            setLoggingOut(false);
        }
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
            onConfirm={onLogout}
            cancelDisabled={loggingOut}
            confirmDisabled={loggingOut}
        >
            <Typography>Are you sure you want to logout?</Typography>
        </Modal>
    );
};

export default LogoutModal;
