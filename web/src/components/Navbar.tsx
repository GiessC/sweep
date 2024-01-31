'use client';

import LogoutModal from '@/components/logout/LogoutModal';
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
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { CgProfile as AccountCircle } from 'react-icons/cg';

const Navbar = () => {
    const router = useRouter();
    const { isAuthenticated } = useContext<IAuthContext>(AuthContext);
    const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogin = () => {
        router.push('/login');
    };

    const onProfile = () => {
        router.push('/profile/me');
        handleClose();
    };

    const onLogout = () => {
        setLogoutModalOpen(true);
    };

    return (
        <>
            <Box className='flex-grow-0'>
                <AppBar className='bg-primary'>
                    <Toolbar>
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
                                    aria-controls='menu-appbar'
                                    aria-haspopup='true'
                                    onClick={handleMenu}
                                    color='inherit'
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id='menu-appbar'
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
