import Navbar from '@/components/Navbar';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import React from 'react';
import './globals.css';

export const metadata = {
    title: 'sweep',
    description: 'We do social media',
};

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <html lang='en'>
            <UserProvider
                loginUrl='/auth/login'
                profileUrl='/auth/me'
            >
                <body className='w-screen h-screen'>
                    <div className='flex flex-col'>
                        <Navbar />
                        {children}
                    </div>
                </body>
            </UserProvider>
        </html>
    );
}
