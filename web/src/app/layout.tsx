'use client';

import Navbar from '@/components/Navbar';
import AuthProvider from '@/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import './globals.css';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const queryClient = new QueryClient();

    return (
        <html lang='en'>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <body className='w-screen h-screen'>
                        <div className='flex flex-col'>
                            <Navbar />
                            <div style={{ marginTop: 16 }}>{children}</div>
                        </div>
                    </body>
                </QueryClientProvider>
            </AuthProvider>
        </html>
    );
}
