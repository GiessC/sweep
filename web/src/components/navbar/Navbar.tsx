'use client';

import LogoutModal from '@/components/auth/logout/LogoutModal';
import { AuthContext, IAuthContext } from '@/context/AuthContext';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Squash as MenuIcon } from 'hamburger-react';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import UserMenu from './UserMenu';

const Navbar = () => {
    const router = useRouter();
    const { validating, authenticated } = useContext<IAuthContext>(AuthContext);
    const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);

    const openHamburger = (event: React.MouseEvent<HTMLButtonElement>) => {
        // TODO: Create a navigation menu for a user's communities and such.
    };

    const onLogin = () => {
        router.push('/auth/login');
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
                            onClick={openHamburger}
                            color='inherit'
                        >
                            <MenuIcon />
                        </Button>
                        <div className='grow'>
                            {/* TODO: Quick links go here */}
                        </div>
                        {!validating && !authenticated && (
                            <Button
                                size='large'
                                color='inherit'
                                onClick={onLogin}
                            >
                                Login
                            </Button>
                        )}
                        {!validating && authenticated && (
                            <UserMenu setLogoutModalOpen={setLogoutModalOpen} />
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
