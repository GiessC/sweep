import Modal from '@/components/common/Modal/Modal';
import { Typography } from '@mui/material';
import { redirect } from 'next/navigation';

export interface LogoutModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const LogoutModal = ({ isOpen, setIsOpen }: LogoutModalProps) => {
    const logout = () => {
        redirect('/auth/logout');
    };

    return (
        <Modal
            title='Logout?'
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            confirmButtonText='Logout'
            styles={{ confirmButton: 'bg-red-600 text-white' }}
            onConfirm={logout}
        >
            <Typography>Are you sure you want to logout?</Typography>
        </Modal>
    );
};

export default LogoutModal;
