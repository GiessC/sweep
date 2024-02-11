'use client';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CgProfile as AccountCircle } from 'react-icons/cg';

interface UserMenuProps {
    setLogoutModalOpen: (isOpen: boolean) => void;
}

const UserMenu = ({ setLogoutModalOpen }: UserMenuProps) => {
    const router = useRouter();
    const [menuAnchor, setMenuAnchor] = useState<Element | null>(null);

    const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchor(event.currentTarget);
    };

    const closeMenu = () => {
        setMenuAnchor(null);
    };

    const onProfile = () => {
        router.push('/profile/me');
        closeMenu();
    };

    const onResetPassword = () => {
        router.push('/auth/password/reset');
        closeMenu();
    };

    const onLogout = () => {
        setLogoutModalOpen(true);
        closeMenu();
    };

    return (
        <div>
            <IconButton
                size='large'
                aria-controls='user-menu-appbar'
                aria-haspopup='true'
                onClick={openMenu}
                color='inherit'
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id='user-menu-appbar'
                anchorEl={menuAnchor}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(menuAnchor)}
                onClose={closeMenu}
            >
                <MenuItem onClick={onProfile}>Profile</MenuItem>
                {/* ? TODO: Reset password may not be here in the future. May be on a settings page (but we lack enough features to justify a settings page) */}
                <MenuItem onClick={onResetPassword}>Reset Password</MenuItem>
                <MenuItem onClick={onLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default UserMenu;
