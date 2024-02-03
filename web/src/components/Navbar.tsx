'use client';

import LogoutModal from '@/components/auth/logout/LogoutModal';
import { AuthContext, IAuthContext } from '@/context/AuthContext';
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
} from '@mui/material';
import { Squash as MenuIcon } from 'hamburger-react';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { CgProfile as AccountCircle } from 'react-icons/cg';

const Navbar = () => {
    const router = useRouter();
    const { isAuthenticated } = useContext<IAuthContext>(AuthContext);
    const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        // TODO: Create a navigation menu for a user's communities and such.
    };

    const handleUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogin = () => {
        router.push('/auth/login');
    };

    const onProfile = () => {
        router.push('/profile/me');
        handleClose();
    };

    const onResetPassword = () => {
        router.push('/auth/password/reset');
        handleClose();
    };

    const onLogout = () => {
        setLogoutModalOpen(true);
    };

    return (
        <>
            <Box className='flex grow'>
                <AppBar className='bg-primary'>
                    <Toolbar>
                        <Button
                            className='mr-2'
                            size='large'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleMenu}
                            color='inherit'
                        >
                            <MenuIcon />
                        </Button>
                        <div className='grow'>
                            {/* TODO: Quick links go here */}
                        </div>
                        {!isAuthenticated && (
                            <Button
                                size='large'
                                color='inherit'
                                onClick={onLogin}
                            >
                                Login
                            </Button>
                        )}
                        {isAuthenticated && (
                            <div>
                                <IconButton
                                    size='large'
                                    aria-controls='user-menu-appbar'
                                    aria-haspopup='true'
                                    onClick={handleUserMenu}
                                    color='inherit'
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id='user-menu-appbar'
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={onProfile}>
                                        Profile
                                    </MenuItem>
                                    {/* ? TODO: Reset password may not be here in the future. May be on a settings page (but we lack enough features to justify a settings page) */}
                                    <MenuItem onClick={onResetPassword}>
                                        Reset Password
                                    </MenuItem>
                                    <MenuItem onClick={onLogout}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <LogoutModal
                isOpen={logoutModalOpen}
                setIsOpen={setLogoutModalOpen}
            />
        </>
    );
};

export default Navbar;
