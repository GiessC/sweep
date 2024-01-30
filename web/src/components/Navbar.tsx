'use client';

import LogoutModal from '@/components/logout/LogoutModal';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const { isAuthenticated: isAuthenticatedFn } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const isAuthenticated = async () => {
            setIsLoading(false);
            const isAuthenticated = await isAuthenticatedFn();
            setIsLoading(false);
            setIsAuthenticated(isAuthenticated);
        };
        isAuthenticated();
    }, []);

    const logout = () => {
        setLogoutModalOpen(true);
    };

    if (isLoading) return <>Loading...</>;

    return (
        <>
            <div className='w-full h-16 bg-stone-500 fixed top-0'>
                <div className='container mx-auto px-4 h-full'>
                    <div className='flex justify-between items-center h-full'>
                        <ul className='hidden md:flex gap-x-6 text-white'>
                            {!isAuthenticated && (
                                <li>
                                    <Link href='/login'>
                                        <p>Login</p>
                                    </Link>
                                </li>
                            )}
                            {isAuthenticated && (
                                <li>
                                    <button onClick={logout}>
                                        <p>Logout</p>
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <LogoutModal
                isOpen={logoutModalOpen}
                setIsOpen={setLogoutModalOpen}
            />
        </>
    );
};

export default Navbar;
