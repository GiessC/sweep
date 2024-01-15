'use client';

import LogoutModal from '@/features/logout/LogoutModal';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
    const { user, isLoading, error } = useUser();

    const logout = () => {
        setLogoutModalOpen(true);
    };

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <>
            <div>{error?.message}</div>
            <div className='w-full h-16 bg-stone-500 fixed top-0'>
                <div className='container mx-auto px-4 h-full'>
                    <div className='flex justify-between items-center h-full'>
                        <ul className='hidden md:flex gap-x-6 text-white'>
                            {!user && (
                                <li>
                                    <Link href='/auth/login'>
                                        <p>Login</p>
                                    </Link>
                                </li>
                            )}
                            {!!user && (
                                <li>
                                    <button onClick={() => logout()}>
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
