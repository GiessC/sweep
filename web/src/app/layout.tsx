'use client';

import Navbar from '@/components/Navbar';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import React from 'react';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const queryClient = new QueryClient();

    return (
        <html lang='en'>
            <QueryClientProvider client={queryClient}>
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
            </QueryClientProvider>
        </html>
    );
}
